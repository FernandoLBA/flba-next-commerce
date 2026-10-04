import { request } from "./request";
import { RequestOptions } from "./api.types";

interface Api {
  get: <T>(path: string, options?: RequestOptions) => Promise<T>;
}

export const api: Api = {
  get: async <T>(path: string, options?: RequestOptions) =>
    await request<T>("GET", path, undefined, options),
};
