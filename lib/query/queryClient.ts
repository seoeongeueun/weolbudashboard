import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000, // 60초
        gcTime: 1_800_000, // 30분
        refetchOnWindowFocus: false,
      },
    },
  });
}
