import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsed.success) {
  throw new Error(`Envs inválidas:\n${z.prettifyError(parsed.error)}`);
}

export const clientEnvs = parsed.data;
