import { createClient } from "./generated/client";

export const apiClient = createClient({
  baseUrl: "http://localhost:3000/api",
});
