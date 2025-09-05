import { bookingCancelSchema } from "./booking-cancel-schema";

export const bookingCancelInput = bookingCancelSchema.refine(
  (data) => !!data.id || !!data.uid,
  "At least one of the following required: 'id', 'uid'."
);
