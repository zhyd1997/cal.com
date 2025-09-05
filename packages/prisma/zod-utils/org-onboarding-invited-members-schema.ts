import z from "zod";

export const orgOnboardingInvitedMembersSchema = z.array(
  z.object({ email: z.string().email(), name: z.string().optional() })
);
