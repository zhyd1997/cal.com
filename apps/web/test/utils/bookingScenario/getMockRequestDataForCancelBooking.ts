import type z from "zod";

import type { bookingCancelSchema } from "@calcom/prisma/zod-utils/booking-cancel-schema";

export function getMockRequestDataForCancelBooking(data: z.infer<typeof bookingCancelSchema>) {
  return data;
}
