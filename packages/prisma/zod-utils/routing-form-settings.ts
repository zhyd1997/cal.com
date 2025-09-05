import { z } from "zod";

export const RoutingFormSettings = z
  .object({
    emailOwnerOnSubmission: z.boolean(),
    sendUpdatesTo: z.array(z.number()).optional(),
    sendToAll: z.boolean().optional(),
  })
  .nullable();
