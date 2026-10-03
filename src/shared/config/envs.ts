export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!NEXT_PUBLIC_API_URL) throw new Error("Se requiere la env NEXT_PUBLIC_API_URL");
