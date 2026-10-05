"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false, //? evita llamadas al volver a la pestaña
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
