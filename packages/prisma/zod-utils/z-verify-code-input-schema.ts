import z from "zod";

import { emailSchema } from "./email-schema";

export const ZVerifyCodeInputSchema = z.object({
  email: emailSchema,
  code: z.string(),
});

export type ZVerifyCodeInputSchema = z.infer<typeof ZVerifyCodeInputSchema>;
