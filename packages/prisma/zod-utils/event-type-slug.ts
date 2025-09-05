import z from "zod";

import { slugify } from "@calcom/lib/slugify";

export const eventTypeSlug = z
  .string()
  .trim()
  .transform((val) => slugify(val))
  .refine((val) => val.length >= 1, {
    message: "Please enter at least one character",
  });
