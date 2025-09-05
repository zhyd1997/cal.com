import type { UnitTypeLongPlural } from "dayjs";
import z from "zod";

export const RequiresConfirmationThresholdUnits: z.ZodType<UnitTypeLongPlural> = z.enum(["hours", "minutes"]);
