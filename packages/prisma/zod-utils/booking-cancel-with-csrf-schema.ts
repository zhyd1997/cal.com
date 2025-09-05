import z from "zod";

import { bookingCancelSchema } from "./booking-cancel-schema";

export const bookingCancelWithCsrfSchema = bookingCancelSchema
  .extend({
    csrfToken: z.string().length(64, "Invalid CSRF token"),
  })
  .refine((data) => !!data.id || !!data.uid, "At least one of the following required: 'id', 'uid'.");
