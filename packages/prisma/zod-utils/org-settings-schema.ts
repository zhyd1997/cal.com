import z from "zod";

export const orgSettingsSchema = z
  .object({
    isOrganizationVerified: z.boolean().optional(),
    isOrganizationConfigured: z.boolean().optional(),
    isAdminReviewed: z.boolean().optional(),
    orgAutoAcceptEmail: z.string().optional(),
    isAdminAPIEnabled: z.boolean().optional(),
  })
  .nullable();
