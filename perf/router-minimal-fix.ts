// Minimal fix version - only change imports to type-only where possible
import type { z } from "zod";

import { logP } from "@calcom/lib/perf";

import authedProcedure from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";

// Lazy load schemas to avoid parsing overhead at module load time
const getSchemas = async () => {
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
  
  return {
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
};

import { get } from "./procedures/get";

// Lazy load eventOwnerProcedure to avoid heavy util.ts parsing
const getEventOwnerProcedure = async () => {
  const { eventOwnerProcedure } = await import("./util");
  return eventOwnerProcedure;
};

type BookingsRouterHandlerCache = {
  getByViewer?: typeof import("./getByViewer.handler").getByViewerHandler;
  getUserEventGroups?: typeof import("./getUserEventGroups.handler").getUserEventGroups;
  getEventTypesFromGroup?: typeof import("./getEventTypesFromGroup.handler").getEventTypesFromGroup;
  getTeamAndEventTypeOptions?: typeof import("./getTeamAndEventTypeOptions.handler").getTeamAndEventTypeOptions;
  list?: typeof import("./list.handler").listHandler;
  listWithTeam?: typeof import("./listWithTeam.handler").listWithTeamHandler;
  create?: typeof import("./create.handler").createHandler;
  get?: typeof import("./get.handler").getHandler;
  update?: typeof import("./update.handler").updateHandler;
  delete?: typeof import("./delete.handler").deleteHandler;
  duplicate?: typeof import("./duplicate.handler").duplicateHandler;
  bulkEventFetch?: typeof import("./bulkEventFetch.handler").bulkEventFetchHandler;
  bulkUpdateToDefaultLocation?: typeof import("./bulkUpdateToDefaultLocation.handler").bulkUpdateToDefaultLocationHandler;
};

// Init the handler cache
const UNSTABLE_HANDLER_CACHE: BookingsRouterHandlerCache = {};

// Cache schemas and eventOwnerProcedure
let _schemas: Awaited<ReturnType<typeof getSchemas>> | null = null;
let _eventOwnerProcedure: Awaited<ReturnType<typeof getEventOwnerProcedure>> | null = null;

export const eventTypesRouter = router({
  // REVIEW: What should we name this procedure?
  getByViewer: authedProcedure.input((async () => {
    if (!_schemas) _schemas = await getSchemas();
    return _schemas.ZEventTypeInputSchema;
  })()).query(async ({ ctx, input }) => {
    const { getByViewerHandler } = await import("./getByViewer.handler");

    const timer = logP(`getByViewer(${ctx.user.id})`);

    const result = await getByViewerHandler({
      ctx,
      input,
    });

    timer();

    return result;
  }),
  
  getUserEventGroups: authedProcedure.input((async () => {
    if (!_schemas) _schemas = await getSchemas();
    return _schemas.ZEventTypeInputSchema;
  })()).query(async ({ ctx, input }) => {
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
    .input((async () => {
      if (!_schemas) _schemas = await getSchemas();
      return _schemas.ZGetEventTypesFromGroupSchema;
    })())
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
    .input((async () => {
      if (!_schemas) _schemas = await getSchemas();
      return _schemas.ZGetTeamAndEventTypeOptionsSchema;
    })())
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

  create: authedProcedure.input((async () => {
    if (!_schemas) _schemas = await getSchemas();
    return _schemas.ZCreateInputSchema;
  })()).mutation(async ({ ctx, input }) => {
    const { createHandler } = await import("./create.handler");

    return createHandler({
      ctx,
      input,
    });
  }),

  get,

  update: (async () => {
    if (!_eventOwnerProcedure) _eventOwnerProcedure = await getEventOwnerProcedure();
    if (!_schemas) _schemas = await getSchemas();
    return _eventOwnerProcedure.input(_schemas.ZUpdateInputSchema);
  })().mutation(async ({ ctx, input }) => {
    const { updateHandler } = await import("./update.handler");

    return updateHandler({
      ctx,
      input,
    });
  }),

  delete: (async () => {
    if (!_eventOwnerProcedure) _eventOwnerProcedure = await getEventOwnerProcedure();
    if (!_schemas) _schemas = await getSchemas();
    return _eventOwnerProcedure.input(_schemas.ZDeleteInputSchema);
  })().mutation(async ({ ctx, input }) => {
    const { deleteHandler } = await import("./delete.handler");

    return deleteHandler({
      ctx,
      input,
    });
  }),

  duplicate: (async () => {
    if (!_eventOwnerProcedure) _eventOwnerProcedure = await getEventOwnerProcedure();
    if (!_schemas) _schemas = await getSchemas();
    return _eventOwnerProcedure.input(_schemas.ZDuplicateInputSchema);
  })().mutation(async ({ ctx, input }) => {
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
    .input((async () => {
      const { z } = await import("zod");
      return z.object({
        eventTypeIds: z.array(z.number()),
      });
    })())
    .mutation(async ({ ctx, input }) => {
      const { bulkUpdateToDefaultLocationHandler } = await import("./bulkUpdateToDefaultLocation.handler");

      return bulkUpdateToDefaultLocationHandler({
        ctx,
        input,
      });
    }),

  getHashedLink: authedProcedure.input((async () => {
    if (!_schemas) _schemas = await getSchemas();
    return _schemas.ZGetHashedLinkInputSchema;
  })()).query(async ({ ctx, input }) => {
    const { getHashedLinkHandler } = await import("./getHashedLink.handler");

    return getHashedLinkHandler({
      ctx,
      input,
    });
  }),

  getHashedLinks: authedProcedure.input((async () => {
    if (!_schemas) _schemas = await getSchemas();
    return _schemas.ZGetHashedLinksInputSchema;
  })()).query(async ({ ctx, input }) => {
    const { getHashedLinksHandler } = await import("./getHashedLinks.handler");

    return getHashedLinksHandler({
      ctx,
      input,
    });
  }),
});