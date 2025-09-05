import z from "zod";

export const createdEventSchema = z
  .object({
    id: z.string(),
    thirdPartyRecurringEventId: z.string(),
    password: z.union([z.string(), z.undefined()]),
    onlineMeetingUrl: z.string().nullable(),
    iCalUID: z.string().optional(),
  })
  .passthrough();
