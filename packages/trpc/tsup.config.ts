import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "index.ts",
      "react/index": "react/index.ts",
      "react/trpc": "react/trpc.ts",
      "react/shared": "react/shared.ts",
      "react/hooks/useMeQuery": "react/hooks/useMeQuery.ts",
      "react/hooks/useEmailVerifyCheck": "react/hooks/useEmailVerifyCheck.ts",
    },
    format: ["cjs", "esm"],
    dts: false,
    sourcemap: true,
    clean: true,
    external: [
      "react",
      "react-dom",
      "next",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react-query",
      "@trpc/server",
      "@tanstack/react-query",
      "superjson",
      "zod",
    ],
    outDir: "dist",
  },
  {
    entry: {
      "server/index": "server/trpc.ts",
      "server/createContext": "server/createContext.ts",
      "server/createNextApiHandler": "server/createNextApiHandler.ts",
      "server/errorFormatter": "server/errorFormatter.ts",
      "server/onErrorHandler": "server/onErrorHandler.ts",
      "server/types": "server/types.ts",
    },
    format: ["cjs", "esm"],
    dts: false,
    sourcemap: true,
    external: ["@trpc/server", "@trpc/next", "superjson", "zod", "@calcom/*"],
    outDir: "dist",
    target: "node18",
  },
]);
