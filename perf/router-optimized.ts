// Optimized version of packages/trpc/server/routers/viewer/eventTypes/_router.ts
// Focus: Minimize top-level imports and defer heavy work

// Type-only imports to avoid loading runtime code during analysis
import type { z } from "zod";

// Defer heavy imports behind lazy boundaries
const lazyImports = {
  z: null as typeof import("zod").z | null,
  logP: null as typeof import("@calcom/lib/perf").logP | null,
  authedProcedure: null as typeof import("../../../procedures/authedProcedure").default | null,
  router: null as typeof import("../../../trpc").router | null,
  eventOwnerProcedure: null as typeof import("./util").eventOwnerProcedure | null,
  schemas: null as {
    ZEventTypeInputSchema: any;
    ZGetEventTypesFromGroupSchema: any;
    ZGetTeamAndEventTypeOptionsSchema: any;
    ZCreateInputSchema: any;
    ZUpdateInputSchema: any;
    ZDeleteInputSchema: any;
    ZDuplicateInputSchema: any;
    ZGetHashedLinkInputSchema: any;
    ZGetHashedLinksInputSchema: any;
  } | null,
};

// Helper to lazy load dependencies only when procedures are called
const getLazyImport = async <T>(key: keyof typeof lazyImports, importFn: () => Promise<T>): Promise<T> => {
  if (!lazyImports[key]) {
    lazyImports[key] = await importFn();
  }
  return lazyImports[key] as T;
};

// Load schemas lazily
const getSchemas = async () => {
  if (!lazyImports.schemas) {
    const [
      { ZEventTypeInputSchema, ZGetEventTypesFromGroupSchema },
      { ZGetTeamAndEventTypeOptionsSchema },
      { ZCreateInputSchema },
      { ZUpdateInputSchema },
      { ZDeleteInputSchema },
      { ZDuplicateInputSchema },
      { ZGetHashedLinkInputSchema },
      { ZGetHashedLinksInputSchema },
    ] = await Promise.all([
      import("./getByViewer.schema"),
      import("./getTeamAndEventTypeOptions.schema"),
      import("./create.schema"),
      import("./update.schema"),
      import("./delete.schema"),
      import("./duplicate.schema"),
      import("./getHashedLink.schema"),
      import("./getHashedLinks.schema"),
    ]);
    
    lazyImports.schemas = {
      ZEventTypeInputSchema,
      ZGetEventTypesFromGroupSchema,
      ZGetTeamAndEventTypeOptionsSchema,
      ZCreateInputSchema,
      ZUpdateInputSchema,
      ZDeleteInputSchema,
      ZDuplicateInputSchema,
      ZGetHashedLinkInputSchema,
      ZGetHashedLinksInputSchema,
    };
  }
  return lazyImports.schemas;
};

// Only import the get procedure directly since it's used immediately
import { get } from "./procedures/get";

type BookingsRouterHandlerCache = {
  getByViewer?: typeof import("./getByViewer.handler").getByViewerHandler;
  getUserEventGroups?: typeof import("./getUserEventGroups.handler").getUserEventGroups;
  getEventTypesFromGroup?: typeof import("./getEventTypesFromGroup.handler").getEventTypesFromGroup;
  getTeamAndEventTypeOptions?: typeof import("./getTeamAndEventTypeOptions.handler").getTeamAndEventTypeOptions;
  list?: typeof import("./list.handler").listHandler;
  listWithTeam?: typeof import("./listWithTeam.handler").listWithTeamHandler;
  create?: typeof import("./create.handler").createHandler;
  update?: typeof import("./update.handler").updateHandler;
  delete?: typeof import("./delete.handler").deleteHandler;
  duplicate?: typeof import("./duplicate.handler").duplicateHandler;
  bulkEventFetch?: typeof import("./bulkEventFetch.handler").bulkEventFetchHandler;
  bulkUpdateToDefaultLocation?: typeof import("./bulkUpdateToDefaultLocation.handler").bulkUpdateToDefaultLocationHandler;
};

// Init the handler cache
const UNSTABLE_HANDLER_CACHE: BookingsRouterHandlerCache = {};

// Factory function to create router - defers all heavy work
const createEventTypesRouter = async () => {
  const [router, authedProcedure, eventOwnerProcedure, schemas, { z }, { logP }] = await Promise.all([
    getLazyImport("router", () => import("../../../trpc").then(m => m.router)),
    getLazyImport("authedProcedure", () => import("../../../procedures/authedProcedure")),
    getLazyImport("eventOwnerProcedure", () => import("./util").then(m => m.eventOwnerProcedure)),
    getSchemas(),
    getLazyImport("z", () => import("zod")),
    getLazyImport("logP", () => import("@calcom/lib/perf")),
  ]);

  return router({
    // REVIEW: What should we name this procedure?
    getByViewer: authedProcedure.input(schemas.ZEventTypeInputSchema).query(async ({ ctx, input }) => {
      const { getByViewerHandler } = await import("./getByViewer.handler");

      const timer = logP(`getByViewer(${ctx.user.id})`);

      const result = await getByViewerHandler({
        ctx,
        input,
      });

      timer();

      return result;
    }),
    getUserEventGroups: authedProcedure.input(schemas.ZEventTypeInputSchema).query(async ({ ctx, input }) => {
      const { getUserEventGroups } = await import("./getUserEventGroups.handler");

      const timer = logP(`getUserEventGroups(${ctx.user.id})`);

      const result = await getUserEventGroups({
        ctx,
        input,
      });

      timer();

      return result;
    }),

    getEventTypesFromGroup: authedProcedure
      .input(schemas.ZGetEventTypesFromGroupSchema)
      .query(async ({ ctx, input }) => {
        const { getEventTypesFromGroup } = await import("./getEventTypesFromGroup.handler");

        const timer = logP(`getEventTypesFromGroup(${ctx.user.id})`);

        const result = await getEventTypesFromGroup({
          ctx,
          input,
        });

        timer();

        return result;
      }),

    getTeamAndEventTypeOptions: authedProcedure
      .input(schemas.ZGetTeamAndEventTypeOptionsSchema)
      .query(async ({ ctx, input }) => {
        const { getTeamAndEventTypeOptions } = await import("./getTeamAndEventTypeOptions.handler");

        const timer = logP(`getTeamAndEventTypeOptions(${ctx.user.id})`);

        const result = await getTeamAndEventTypeOptions({
          ctx,
          input,
        });

        timer();

        return result;
      }),

    list: authedProcedure.query(async ({ ctx }) => {
      const { listHandler } = await import("./list.handler");

      return listHandler({
        ctx,
      });
    }),

    listWithTeam: authedProcedure.query(async ({ ctx }) => {
      const { listWithTeamHandler } = await import("./listWithTeam.handler");

      return listWithTeamHandler({
        ctx,
      });
    }),

    create: authedProcedure.input(schemas.ZCreateInputSchema).mutation(async ({ ctx, input }) => {
      const { createHandler } = await import("./create.handler");

      return createHandler({
        ctx,
        input,
      });
    }),

    get,

    update: eventOwnerProcedure.input(schemas.ZUpdateInputSchema).mutation(async ({ ctx, input }) => {
      const { updateHandler } = await import("./update.handler");

      return updateHandler({
        ctx,
        input,
      });
    }),

    delete: eventOwnerProcedure.input(schemas.ZDeleteInputSchema).mutation(async ({ ctx, input }) => {
      const { deleteHandler } = await import("./delete.handler");

      return deleteHandler({
        ctx,
        input,
      });
    }),

    duplicate: eventOwnerProcedure.input(schemas.ZDuplicateInputSchema).mutation(async ({ ctx, input }) => {
      const { duplicateHandler } = await import("./duplicate.handler");

      return duplicateHandler({
        ctx,
        input,
      });
    }),

    bulkEventFetch: authedProcedure.query(async ({ ctx }) => {
      const { bulkEventFetchHandler } = await import("./bulkEventFetch.handler");

      return bulkEventFetchHandler({
        ctx,
      });
    }),

    bulkUpdateToDefaultLocation: authedProcedure
      .input(
        z.object({
          eventTypeIds: z.array(z.number()),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { bulkUpdateToDefaultLocationHandler } = await import("./bulkUpdateToDefaultLocation.handler");

        return bulkUpdateToDefaultLocationHandler({
          ctx,
          input,
        });
      }),

    getHashedLink: authedProcedure.input(schemas.ZGetHashedLinkInputSchema).query(async ({ ctx, input }) => {
      const { getHashedLinkHandler } = await import("./getHashedLink.handler");

      return getHashedLinkHandler({
        ctx,
        input,
      });
    }),

    getHashedLinks: authedProcedure.input(schemas.ZGetHashedLinksInputSchema).query(async ({ ctx, input }) => {
      const { getHashedLinksHandler } = await import("./getHashedLinks.handler");

      return getHashedLinksHandler({
        ctx,
        input,
      });
    }),
  });
};

// Export a lazy-initialized router
let _eventTypesRouter: Awaited<ReturnType<typeof createEventTypesRouter>> | null = null;

export const eventTypesRouter = new Proxy({} as Awaited<ReturnType<typeof createEventTypesRouter>>, {
  get(target, prop) {
    if (!_eventTypesRouter) {
      // Initialize router on first access
      _eventTypesRouter = createEventTypesRouter();
    }
    return _eventTypesRouter.then(router => router[prop as keyof typeof router]);
  }
});