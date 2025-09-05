import { ZodObject } from "zod";
import type { objectInputType, objectOutputType, ZodRawShape, ZodTypeAny } from "zod";

import { denullish, type ZodDenullish } from "./denullish";
import { entries } from "./entries";
import { fromEntries } from "./from-entries";

type UnknownKeysParam = "passthrough" | "strict" | "strip";

export type ZodDenullishShape<T extends ZodRawShape> = {
  [k in keyof T]: ZodDenullish<T[k]>;
};

export function denullishShape<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam = "strip",
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall>,
  Input = objectInputType<T, Catchall>
>(
  obj: ZodObject<T, UnknownKeys, Catchall, Output, Input>
): ZodObject<ZodDenullishShape<T>, UnknownKeys, Catchall> {
  const a = entries(obj.shape).map(([field, schema]) => [field, denullish(schema)] as const) as {
    [K in keyof T]: [K, ZodDenullish<T[K]>];
  }[keyof T][];
  return new ZodObject({
    ...obj._def,
    shape: () => fromEntries(a) as unknown as ZodDenullishShape<T>,
  });
}
