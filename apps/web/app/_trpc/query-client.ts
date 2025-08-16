"use client";

import { QueryClient } from "@tanstack/react-query";

import { TRPCClientError } from "@trpc/client";

const MAX_QUERY_RETRIES = 3;

const isTRPCClientError = (cause: unknown): cause is TRPCClientError<any> => {
  return cause instanceof TRPCClientError;
};

export const queryClient = new QueryClient({
  // Optimized configurations for development performance
  defaultOptions: {
    queries: {
      /**
       * Increased stale time for better development performance
       * @example if one page components uses a query that is also used further down the tree
       */
      staleTime: process.env.NODE_ENV === "development" ? 5000 : 1000,
      /**
       * Disable refetch on window focus in development for better performance
       */
      refetchOnWindowFocus: process.env.NODE_ENV !== "development",
      /**
       * Retry `useQuery()` calls depending on this function
       */
      retry(failureCount, error) {
        if (isTRPCClientError(error) && error.data) {
          const { code } = error.data;
          if (code === "BAD_REQUEST" || code === "FORBIDDEN" || code === "UNAUTHORIZED") {
            // if input data is wrong or you're not authorized there's no point retrying a query
            return false;
          }
        }
        return failureCount < MAX_QUERY_RETRIES;
      },
    },
    mutations: {
      /**
       * Optimize mutation retries for development
       */
      retry: process.env.NODE_ENV === "development" ? 1 : 3,
    },
  },
});
