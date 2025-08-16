/**
 * Lightweight development entry point for faster compilation
 * Only exports essential tRPC functionality
 */

// Export only the core tRPC setup
export { router, mergeRouters, middleware, procedure, createCallerFactory } from "./server/trpc";
export { createContext, createContextInner } from "./server/createContext";
export { createNextApiHandler } from "./server/createNextApiHandler";

// Export minimal types
export type { TRPCContext, TRPCContextInner } from "./server/createContext";

// Export minimal client setup
export { trpc } from "./react/trpc";
export { ENDPOINTS } from "./react/shared";