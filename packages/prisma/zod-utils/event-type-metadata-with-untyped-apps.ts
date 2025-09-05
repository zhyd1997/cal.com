import z from "zod";

import { eventTypeMetaDataSchemaWithoutApps as _base } from "./event-type-metadata-without-apps";

export const eventTypeMetaDataSchemaWithUntypedApps = _base.merge(
  z.object({
    apps: z.unknown().optional(),
  })
);
