import z from "zod";

import { bookingResponses } from "@calcom/prisma/zod-utils/booking-responses";

export const bookingSeatDataSchema = z.object({
  responses: bookingResponses,
});
