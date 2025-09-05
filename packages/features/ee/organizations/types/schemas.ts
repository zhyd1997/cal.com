import z from "zod";

import { orgOnboardingInvitedMembersSchema } from "@calcom/prisma/zod-utils/org-onboarding-invited-members-schema";
import { orgOnboardingTeamsSchema } from "@calcom/prisma/zod-utils/org-onboarding-teams-schema";

// Base user schema - fields that any user can set
export const createOrganizationSchema = z.object({
  language: z.string().optional(),
  logo: z.string().nullish(),
  bio: z.string().nullish(),
  onboardingId: z.string(),
  invitedMembers: orgOnboardingInvitedMembersSchema.optional(),
  teams: orgOnboardingTeamsSchema.optional(),
});
