import z from "zod";

import { bookerLayoutOptions } from "./booker-layout-options";

const layoutOptions = z.union([
  z.literal(bookerLayoutOptions[0]),
  z.literal(bookerLayoutOptions[1]),
  z.literal(bookerLayoutOptions[2]),
]);

export const bookerLayouts = z
  .object({
    enabledLayouts: z.array(layoutOptions),
    defaultLayout: layoutOptions,
  })
  .nullable();

export type BookerLayoutSettings = z.infer<typeof bookerLayouts>;
