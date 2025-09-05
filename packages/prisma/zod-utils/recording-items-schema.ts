import { z } from "zod";

import { recordingItemSchema } from "./recording-item-schema";

export const recordingItemsSchema = z.array(recordingItemSchema);
