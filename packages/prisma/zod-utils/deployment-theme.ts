import z from "zod";

export const DeploymentTheme = z
  .object({
    brand: z.string().default("#292929"),
    textBrand: z.string().default("#ffffff"),
    darkBrand: z.string().default("#fafafa"),
    textDarkBrand: z.string().default("#292929"),
    bookingHighlight: z.string().default("#10B981"),
    bookingLightest: z.string().default("#E1E1E1"),
    bookingLighter: z.string().default("#ACACAC"),
    bookingLight: z.string().default("#888888"),
    bookingMedian: z.string().default("#494949"),
    bookingDark: z.string().default("#313131"),
    bookingDarker: z.string().default("#292929"),
    fontName: z.string().default("Cal Sans"),
    fontSrc: z.string().default("https://cal.com/cal.ttf"),
  })
  .optional();
