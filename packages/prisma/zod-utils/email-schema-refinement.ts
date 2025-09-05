import { emailRegex } from "@calcom/lib/emailSchema";

export const emailSchemaRefinement = (value: string) => {
  return emailRegex.test(value);
};
