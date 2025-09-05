import z from "zod";

export const eventTypeColor = z
  .object({
    lightEventTypeColor: z.string(),
    darkEventTypeColor: z.string(),
  })
  .nullable();
