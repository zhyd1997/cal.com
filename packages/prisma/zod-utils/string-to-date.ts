import z from "zod";

export const stringToDate = z.string().transform((a) => new Date(a));
