import type { z } from "zod";

import { bookingConfirmPatchBodySchema } from "@calcom/prisma/zod-utils/booking-confirm-patch-body-schema";

export const ZConfirmInputSchema = bookingConfirmPatchBodySchema;

export type TConfirmInputSchema = z.infer<typeof ZConfirmInputSchema>;
