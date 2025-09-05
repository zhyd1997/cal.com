import z from "zod";

import { PlatformClientParamsSchema } from "./platform-client-params-schema";

export const bookingConfirmPatchBodySchema = z.object({
  bookingId: z.number(),
  confirmed: z.boolean(),
  recurringEventId: z.string().optional(),
  reason: z.string().optional(),
  emailsEnabled: z.boolean().default(true),
  platformClientParams: PlatformClientParamsSchema.optional(),
});
