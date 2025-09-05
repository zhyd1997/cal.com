import z from "zod";

// eslint-disable-next-line no-restricted-imports
import { appDataSchemas } from "@calcom/app-store/apps.schemas.generated";

export const EventTypeAppMetadataSchema = z.object(appDataSchemas).partial();
