import { request } from "./lib";
import { RequestOptions } from "./types";

interface Api {
  get: <T>(path: string, options?: RequestOptions) => Promise<T>;
}

export const api: Api = {
  get: async <T>(path: string, options?: RequestOptions) =>
    await request<T>("GET", path, undefined, options),
};
