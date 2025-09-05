import type z from "zod";

import { eventTypeMetaDataSchemaWithUntypedApps } from "./event-type-metadata-with-untyped-apps";

export const EventTypeMetaDataSchema = eventTypeMetaDataSchemaWithUntypedApps.nullable();
export type EventTypeMetadata = z.infer<typeof EventTypeMetaDataSchema>;
