import type { Prisma } from "@prisma/client";
import z from "zod";

import { bookerLayouts } from "./booker-layouts";
import { RequiresConfirmationThresholdUnits } from "./requires-confirmation-threshold-units";

const _eventTypeMetaDataSchemaWithoutApps = z.object({
  smartContractAddress: z.string().optional(),
  blockchainId: z.number().optional(),
  multipleDuration: z.number().array().optional(),
  giphyThankYouPage: z.string().optional(),
  additionalNotesRequired: z.boolean().optional(),
  disableSuccessPage: z.boolean().optional(),
  disableStandardEmails: z
    .object({
      all: z
        .object({
          host: z.boolean().optional(),
          attendee: z.boolean().optional(),
        })
        .optional(),
      confirmation: z
        .object({
          host: z.boolean().optional(),
          attendee: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
  managedEventConfig: z
    .object({
      unlockedFields: z.custom<{ [k in keyof Omit<Prisma.EventTypeSelect, "id">]: true }>().optional(),
    })
    .optional(),
  requiresConfirmationThreshold: z
    .object({
      time: z.number(),
      unit: RequiresConfirmationThresholdUnits,
    })
    .optional(),
  config: z
    .object({
      useHostSchedulesForTeamEvent: z.boolean().optional(),
    })
    .optional(),
  bookerLayouts: bookerLayouts.optional(),
});

export const eventTypeMetaDataSchemaWithoutApps = _eventTypeMetaDataSchemaWithoutApps.nullable();
