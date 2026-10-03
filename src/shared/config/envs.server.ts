import "server-only";

import { z } from "zod";

const schema = z.object({
  APP_SERVER_URL: z.url(),
});

const parsed = schema.safeParse({
  APP_SERVER_URL: process.env.APP_SERVER_URL,
});

if (!parsed.success) {
  throw new Error(`Envs inválidas:\n${z.prettifyError(parsed.error)}`);
}

export const serverEnvs = parsed.data;
