export type RequestOptions = {
  params?: Record<string, string | number | boolean> | undefined;
  headers?: Record<string, string>;
  next?: { revalidate?: number | false; tags?: string[] }; //? caché de Next
};
