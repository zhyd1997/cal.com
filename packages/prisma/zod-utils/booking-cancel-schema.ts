import z from "zod";

export const bookingCancelSchema = z.object({
  id: z.number().optional(),
  uid: z.string().optional(),
  allRemainingBookings: z.boolean().optional(),
  cancelSubsequentBookings: z.boolean().optional(),
  cancellationReason: z.string().optional(),
  seatReferenceUid: z.string().optional(),
  cancelledBy: z.string().email({ message: "Invalid email" }).optional(),
  internalNote: z
    .object({
      id: z.number(),
      name: z.string(),
      cancellationReason: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});
