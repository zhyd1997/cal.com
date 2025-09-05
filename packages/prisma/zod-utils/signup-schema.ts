import z from "zod";

import { isPasswordValid } from "@calcom/features/auth/lib/isPasswordValid";
import { emailRegex } from "@calcom/lib/emailSchema";

export const signupSchema = z.object({
  username: z.string().optional(),
  email: z.string().regex(emailRegex, { message: "Invalid email" }),
  password: z.string().superRefine((data, ctx) => {
    const isStrict = false;
    const result = isPasswordValid(data, true, isStrict);
    Object.keys(result).map((key: string) => {
      if (!result[key as keyof typeof result]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: key,
        });
      }
    });
  }),
  language: z.string().optional(),
  token: z.string().optional(),
});
