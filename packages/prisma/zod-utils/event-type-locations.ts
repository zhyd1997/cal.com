import z from "zod";

export const eventTypeLocations = z.array(
  z.object({
    type: z.string(),
    address: z.string().optional(),
    link: z.string().url().optional(),
    displayLocationPublicly: z.boolean().optional(),
    hostPhoneNumber: z.string().optional(),
    credentialId: z.number().optional(),
    teamName: z.string().optional(),
    customLabel: z.string().optional(),
  })
);
