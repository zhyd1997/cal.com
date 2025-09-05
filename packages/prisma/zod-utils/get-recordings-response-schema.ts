import z from "zod";

import { recordingItemsSchema } from "./recording-types";

export const getRecordingsResponseSchema = z.union([
  z.object({
    total_count: z.number(),
    data: recordingItemsSchema,
  }),
  z.object({}),
]);

export type GetRecordingsResponseSchema = z.infer<typeof getRecordingsResponseSchema>;
