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
      "server/trpc": "server/trpc.ts",
      "server/createContext": "server/createContext.ts",
      "server/createNextApiHandler": "server/createNextApiHandler.ts",
      "server/errorFormatter": "server/errorFormatter.ts",
      "server/onErrorHandler": "server/onErrorHandler.ts",
      "server/types": "server/types.ts",
      "server/procedures/publicProcedure": "server/procedures/publicProcedure.ts",
      "server/procedures/authedProcedure": "server/procedures/authedProcedure.ts",
      "server/middlewares/perfMiddleware": "server/middlewares/perfMiddleware.ts",
      "server/middlewares/sessionMiddleware": "server/middlewares/sessionMiddleware.ts",
      "server/routers/publicViewer/_router": "server/routers/publicViewer/_router.tsx",
      "server/routers/publicViewer/checkIfUserEmailVerificationRequired.schema":
        "server/routers/publicViewer/checkIfUserEmailVerificationRequired.schema.ts",
      "server/routers/publicViewer/markHostAsNoShow.schema":
        "server/routers/publicViewer/markHostAsNoShow.schema.ts",
      "server/routers/publicViewer/samlTenantProduct.schema":
        "server/routers/publicViewer/samlTenantProduct.schema.ts",
      "server/routers/publicViewer/stripeCheckoutSession.schema":
        "server/routers/publicViewer/stripeCheckoutSession.schema.ts",
      "server/routers/publicViewer/submitRating.schema": "server/routers/publicViewer/submitRating.schema.ts",
      "server/routers/publicViewer/procedures/event": "server/routers/publicViewer/procedures/event.ts",
      "server/routers/publicViewer/event.handler": "server/routers/publicViewer/event.handler.ts",
      "server/routers/publicViewer/event.schema": "server/routers/publicViewer/event.schema.ts",
      "server/routers/publicViewer/checkIfUserEmailVerificationRequired.handler":
        "server/routers/publicViewer/checkIfUserEmailVerificationRequired.handler.ts",
      "server/routers/viewer/_router": "server/routers/viewer/_router.tsx",
      "server/routers/loggedInViewer/_router": "server/routers/loggedInViewer/_router.tsx",
      "server/routers/apps/routing-forms/_router": "server/routers/apps/routing-forms/_router.ts",
      "server/routers/viewer/teams/_router": "server/routers/viewer/teams/_router.tsx",
      "server/routers/viewer/bookings/_router": "server/routers/viewer/bookings/_router.tsx",
      "server/routers/viewer/eventTypes/_router": "server/routers/viewer/eventTypes/_router.ts",
      "server/routers/viewer/workflows/util": "server/routers/viewer/workflows/util.ts",
      "server/routers/viewer/slots/types": "server/routers/viewer/slots/types.ts",
      "server/routers/viewer/slots/util": "server/routers/viewer/slots/util.ts",
      "server/routers/viewer/slots/handleNotificationWhenNoSlots":
        "server/routers/viewer/slots/handleNotificationWhenNoSlots.ts",
      "server/routers/viewer/availability/util": "server/routers/viewer/availability/util.ts",
      "server/routers/viewer/organizations/createTeams.handler":
        "server/routers/viewer/organizations/createTeams.handler.ts",
      "server/routers/viewer/teams/inviteMember/inviteMember.handler":
        "server/routers/viewer/teams/inviteMember/inviteMember.handler.ts",
    },
    format: ["cjs", "esm"],
    dts: false,
    sourcemap: true,
    external: [
      "@trpc/server",
      "@trpc/next",
      "superjson",
      "zod",
      "@calcom/*",
      "deasync",
      "i18next-fs-backend",
    ],
    outDir: "dist",
    target: "node18",
    bundle: false,
  },
]);
