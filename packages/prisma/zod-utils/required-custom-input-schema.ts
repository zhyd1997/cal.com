import z from "zod";

export const requiredCustomInputSchema = z.union([
  z.string().trim().min(1),
  z.boolean().refine((v) => v === true),
]);
