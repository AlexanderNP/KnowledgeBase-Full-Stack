import { client } from "./generated/client.gen";

export const apiClient = () => {
  return client.setConfig({
    baseUrl: "http://localhost:3000/api",
  });
};
