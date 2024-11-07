"use client";

import { Toaster } from "@/components/ui/sonner";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "easy-peasy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5,
      retry: 1,
    },
  },
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children} <Toaster position="top-right" />
      </QueryClientProvider>
    </StoreProvider>
  );
}
