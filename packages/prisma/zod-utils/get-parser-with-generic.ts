import type { AnyZodObject } from "zod";
import type z from "zod";

export const getParserWithGeneric =
  <T extends AnyZodObject>(valueSchema: T) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  <Data>(data: Data) => {
    type Output = z.infer<T>;
    type SimpleFormValues = string | number | null | undefined;
    return valueSchema.parse(data) as {
      [key in keyof Data]: Data[key] extends SimpleFormValues ? Data[key] : Output[key];
    };
  };
