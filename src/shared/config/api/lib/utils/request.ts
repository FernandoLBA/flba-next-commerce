import { NEXT_PUBLIC_API_URL } from "@/shared/config/envs";
import { ApiError } from "../../errors";
import { RequestOptions } from "../../types";

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
  { params, headers, ...init }: RequestOptions = {},
) => {
  const url = new URL(path, NEXT_PUBLIC_API_URL);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  const res = await fetch(url, {
    method,
    headers: {
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init, //? aqui vienen el revalidate y tags (chaché de next)
  });

  const data = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, data?.message ?? res.statusText, data);
  }

  return data as T;
};
