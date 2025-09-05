import z from "zod";

export const PlatformClientParamsSchema = z.object({
  platformClientId: z.string().optional(),
  platformRescheduleUrl: z.string().nullable().optional(),
  platformCancelUrl: z.string().nullable().optional(),
  platformBookingUrl: z.string().nullable().optional(),
  platformBookingLocation: z.string().optional(),
  areCalendarEventsEnabled: z.boolean().optional(),
});

export type PlatformClientParams = z.infer<typeof PlatformClientParamsSchema>;
