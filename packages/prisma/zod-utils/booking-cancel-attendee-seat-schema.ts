import z from "zod";

export const bookingCancelAttendeeSeatSchema = z.object({
  seatReferenceUid: z.string(),
});
