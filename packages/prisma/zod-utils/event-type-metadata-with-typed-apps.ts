import z from "zod";

import { eventTypeAppMetadataOptionalSchema } from "./event-type-app-metadata-optional-schema";
import { eventTypeMetaDataSchemaWithoutApps as _base } from "./event-type-metadata-without-apps";

export const eventTypeMetaDataSchemaWithTypedApps = _base
  .merge(
    z.object({
      apps: eventTypeAppMetadataOptionalSchema,
    })
  )
  .nullable();
