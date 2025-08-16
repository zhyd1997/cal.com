/**
 * Lightweight development router for faster compilation
 * Only includes essential routes needed for basic functionality
 */
import { router } from "../trpc";

// Minimal router for development - only essential routes
export const appRouterDev = router({
  // Add only the most critical routes here
  // This will significantly speed up compilation
});

export type AppRouterDev = typeof appRouterDev;