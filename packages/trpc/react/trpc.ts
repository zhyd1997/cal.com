import type { NextPageContext } from "next/types";
import superjson from "superjson";

import { httpBatchLink, httpLink, loggerLink, splitLink } from "@trpc/client";
import type { CreateTRPCNext } from "@trpc/next";
import { createTRPCNext } from "@trpc/next";
// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import type { TRPCClientErrorLike } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "../server/routers/_app";
import { ENDPOINTS } from "./shared";

type Maybe<T> = T | null | undefined;

/**
 * We deploy our tRPC router on multiple lambdas to keep number of imports as small as possible
 * TODO: Make this dynamic based on folders in trpc server?
 */
export type Endpoint = (typeof ENDPOINTS)[number];

// Optimized endpoint resolution with caching
const createEndpointLinks = (runtime: any, useBatch: boolean, url: string) => {
  const linkType = useBatch ? httpBatchLink : httpLink;
  return Object.fromEntries(
    ENDPOINTS.map((endpoint) => [
      endpoint,
      linkType({ url: `${url}/${endpoint}` })(runtime),
    ])
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveEndpoint = (links: any) => {
  // Optimized path parsing
  return (ctx: any) => {
    const parts = ctx.op.path.split(".");
    let endpoint: string;
    let path: string;
    
    if (parts.length === 2) {
      endpoint = parts[0];
      path = parts[1];
    } else {
      endpoint = parts[1];
      path = parts.slice(2).join(".");
    }
    
    return links[endpoint]({ ...ctx, op: { ...ctx.op, path } });
  };
};

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createTRPCReact`.
 * @link https://trpc.io/docs/v10/react#2-create-trpc-hooks
 */
export const trpc: CreateTRPCNext<AppRouter, NextPageContext, null> = createTRPCNext<
  AppRouter,
  NextPageContext
>({
  config() {
    const url =
      typeof window !== "undefined"
        ? "/api/trpc"
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : `${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/trpc`;

    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // Optimized logging - only log errors in development unless explicitly enabled
        loggerLink({
          enabled: (opts) => {
            // Disable logging in development unless explicitly requested
            if (process.env.NODE_ENV === "development") {
              return process.env.NEXT_PUBLIC_LOGGER_LEVEL === "0";
            }
            // Only log errors in production
            return opts.direction === "down" && opts.result instanceof Error;
          },
        }),
        splitLink({
          // check for context property `skipBatch`
          condition: (op) => !!op.context.skipBatch,
          // when condition is true, use normal request
          true: (runtime) => {
            const links = createEndpointLinks(runtime, false, url);
            return resolveEndpoint(links);
          },
          // when condition is false, use batch request
          false: (runtime) => {
            const links = createEndpointLinks(runtime, true, url);
            return resolveEndpoint(links);
          },
        }),
      ],
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
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
            retry(failureCount, _err) {
              const err = _err as never as Maybe<TRPCClientErrorLike<AppRouter>>;
              const code = err?.data?.code;
              if (code === "BAD_REQUEST" || code === "FORBIDDEN" || code === "UNAUTHORIZED") {
                // if input data is wrong or you're not authorized there's no point retrying a query
                return false;
              }
              const MAX_QUERY_RETRIES = 3;
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
      },
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
});

export const transformer = superjson;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
