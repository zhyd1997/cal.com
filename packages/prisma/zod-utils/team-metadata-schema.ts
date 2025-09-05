import z from "zod";

import { BillingPeriod } from "./billing-period";
import { schemaDefaultConferencingApp } from "./schema-default-conferencing-app";

const baseTeamMetadataSchema = z.object({
  defaultConferencingApp: schemaDefaultConferencingApp.optional(),
  requestedSlug: z.string().or(z.null()),
  paymentId: z.string(),
  subscriptionId: z.string().nullable(),
  subscriptionItemId: z.string().nullable(),
  orgSeats: z.number().nullable(),
  orgPricePerSeat: z.number().nullable(),
  migratedToOrgFrom: z
    .object({
      teamSlug: z.string().or(z.null()).optional(),
      lastMigrationTime: z.string().optional(),
      reverted: z.boolean().optional(),
      lastRevertTime: z.string().optional(),
    })
    .optional(),
  billingPeriod: z.nativeEnum(BillingPeriod).optional(),
});

export const teamMetadataSchema = baseTeamMetadataSchema.partial().nullable();

export const teamMetadataStrictSchema = baseTeamMetadataSchema
  .extend({
    subscriptionId: z
      .string()
      .refine((val) => val.startsWith("sub_"), { message: "subscriptionId must start with 'sub_'" })
      .nullable(),
    subscriptionItemId: z
      .string()
      .refine((val) => val.startsWith("si_"), { message: "subscriptionItemId must start with 'si_'" })
      .nullable(),
  })
  .partial()
  .nullable();
