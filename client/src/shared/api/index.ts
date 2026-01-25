import { client } from "./generated/client.gen";
import { authControllerRefresh } from "./generated";
import { localStorageRead, localStorageWrite, localStorageClear } from "@shared/lib/localStorage";
import { ACCESS_TOKEN_STORAGE_KEY } from "@shared/constants";

export const apiClient = () => {
  const clientConfig = client.setConfig({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  });

  client.interceptors.request.use(async (req, options) => {
    const token = localStorageRead<string>(ACCESS_TOKEN_STORAGE_KEY);

    if (token) {
      req.headers.set("Authorization", `Bearer ${token}`);
    }

    return req;
  });

  client.interceptors.response.use(async (res, req, options) => {
    if (res.status !== 401) return res;

    if (options.url.includes("/auth/refresh")) return res;

    const oldToken = localStorageRead<string>(ACCESS_TOKEN_STORAGE_KEY);

    const { data, error } = await authControllerRefresh({
      auth: oldToken,
    });

    if (error || !data) {
      localStorageClear();
      throw error;
    }

    localStorageWrite(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
    return res.headers.set("Authorization", `Bearer ${data.accessToken}`);
  });

  return clientConfig;
};
