import z from "zod";

export const schemaDefaultConferencingApp = z.object({
  appSlug: z.string().default("daily-video").optional(),
  appLink: z.string().optional(),
});
