import type z from "zod";

export type RecordingItemSchema = z.infer<typeof import("./recording-item-schema").recordingItemSchema>;
