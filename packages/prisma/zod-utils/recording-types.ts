import z from "zod";

export const recordingItemSchema = z
  .object({
    id: z.string(),
    room_name: z.string(),
    start_ts: z.number(),
    status: z.string(),
    max_participants: z.number().optional(),
    duration: z.number(),
    share_token: z.string(),
  })
  .passthrough();

export const recordingItemsSchema = z.array(recordingItemSchema);

export type RecordingItemSchema = z.infer<typeof recordingItemSchema>;
