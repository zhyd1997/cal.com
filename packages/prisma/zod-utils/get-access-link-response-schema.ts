import z from "zod";

export const getAccessLinkResponseSchema = z.object({
  download_link: z.string().url(),
});

export type GetAccessLinkResponseSchema = z.infer<typeof getAccessLinkResponseSchema>;
