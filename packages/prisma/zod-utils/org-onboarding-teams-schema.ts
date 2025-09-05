import z from "zod";

export const orgOnboardingTeamsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    isBeingMigrated: z.boolean(),
    slug: z.string().nullable(),
  })
);
