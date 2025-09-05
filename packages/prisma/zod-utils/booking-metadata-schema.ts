import z from "zod";

export const bookingMetadataSchema = z
  .object({
    videoCallUrl: z.string().optional(),
  })
  .and(z.record(z.string()))
  .nullable()
  .describe("BookingMetadata");
