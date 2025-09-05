import z from "zod";

export const downloadLinkSchema = z.object({
  download_link: z.string(),
});
