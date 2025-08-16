"use client";

import superjson from "superjson";

import { ENDPOINTS } from "@calcom/trpc/react/shared";

import { httpBatchLink, httpLink, loggerLink, splitLink } from "@trpc/client";

import { trpc } from "./trpc";

// Performance monitoring for development
const isPerfMonitoringEnabled = process.env.NODE_ENV === "development" && 
  process.env.NEXT_PUBLIC_ENABLE_PERF_MONITORING === "true";

// Optimized endpoint resolution - cache the mapping
const createEndpointLinks = (runtime: any, useBatch: boolean) => {
  const linkType = useBatch ? httpBatchLink : httpLink;
  return Object.fromEntries(
    ENDPOINTS.map((endpoint) => [
      endpoint,
      linkType({
        url: `${url}/${endpoint}`,
      })(runtime),
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
    
    // Performance monitoring
    if (isPerfMonitoringEnabled) {
      const startTime = performance.now();
      const result = links[endpoint]({ ...ctx, op: { ...ctx.op, path } });
      const endTime = performance.now();
      console.log(`tRPC ${endpoint}.${path} took ${(endTime - startTime).toFixed(2)}ms`);
      return result;
    }
    
    return links[endpoint]({ ...ctx, op: { ...ctx.op, path } });
  };
};

const url =
  typeof window !== "undefined"
    ? "/api/trpc"
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : `${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/trpc`;

export const trpcClient = trpc.createClient({
  links: [
    // Only enable logging in development if explicitly requested
    loggerLink({
      enabled: (opts) => {
        // Disable logging in development unless explicitly enabled
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
        const links = createEndpointLinks(runtime, false);
        return resolveEndpoint(links);
      },
      // when condition is false, use batch request
      false: (runtime) => {
        const links = createEndpointLinks(runtime, true);
        return resolveEndpoint(links);
      },
    }),
  ],
  transformer: superjson,
});
