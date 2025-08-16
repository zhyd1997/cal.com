/**
 * Development-specific tRPC import for faster compilation
 * This bypasses heavy type generation during development
 */

// Import from the lightweight development build
export { trpc } from "@calcom/trpc/index.dev";
export { ENDPOINTS } from "@calcom/trpc/react/shared";

// Re-export types for development
export type { AppRouter } from "@calcom/trpc/server/routers/_app";