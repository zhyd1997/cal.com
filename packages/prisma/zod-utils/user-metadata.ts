import z from "zod";

import { bookerLayouts } from "./booker-layouts";
import { schemaDefaultConferencingApp } from "./schema-default-conferencing-app";
import { vitalSettingsUpdateSchema } from "./vital-settings-update-schema";

export const userMetadata = z
  .object({
    proPaidForByTeamId: z.number().optional(),
    stripeCustomerId: z.string().optional(),
    vitalSettings: vitalSettingsUpdateSchema.optional(),
    isPremium: z.boolean().optional(),
    sessionTimeout: z.number().optional(),
    defaultConferencingApp: schemaDefaultConferencingApp.optional(),
    defaultBookerLayouts: bookerLayouts.optional(),
    emailChangeWaitingForVerification: z
      .string()
      .transform((data) => data.toLowerCase())
      .optional(),
    migratedToOrgFrom: z
      .object({
        username: z.string().or(z.null()).optional(),
        lastMigrationTime: z.string().optional(),
        reverted: z.boolean().optional(),
        revertTime: z.string().optional(),
      })
      .optional(),
  })
  .nullable();

export type userMetadataType = z.infer<typeof userMetadata>;
