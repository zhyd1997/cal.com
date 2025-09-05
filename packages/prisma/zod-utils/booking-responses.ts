import z from "zod";

export const bookingResponses = z
  .object({
    email: z.string(),
    attendeePhoneNumber: z.string().optional(),
    name: z.union([
      z.string(),
      z.object({
        firstName: z.string(),
        lastName: z.string().optional(),
      }),
    ]),
    guests: z.array(z.string()).optional(),
    notes: z.string().optional(),
    location: z
      .object({
        optionValue: z.string(),
        value: z.string(),
      })
      .optional(),
    smsReminderNumber: z.string().optional(),
    rescheduleReason: z.string().optional(),
  })
  .nullable();
