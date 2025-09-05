import z from "zod";

export const customInputOptionSchema = z.array(
  z.object({
    label: z.string(),
    type: z.string(),
  })
);
