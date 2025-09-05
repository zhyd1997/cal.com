import type { TFunction } from "i18next";
import z from "zod";

export const getStringAsNumberRequiredSchema = (t: TFunction) =>
  z.string().min(1, t("error_required_field")).pipe(z.coerce.number());
