type DeepWriteable<T> = T extends Readonly<{
  -readonly [K in keyof T]: T[K];
}>
  ? { -readonly [K in keyof T]: DeepWriteable<T[K]> }
  : T;

type FromEntries<T> = T extends [infer Keys, unknown][]
  ? { [K in Keys & PropertyKey]: Extract<T[number], [K, unknown]>[1] }
  : never;

export const fromEntries = <
  E extends [PropertyKey, unknown][] | ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  entries: E
): FromEntries<DeepWriteable<E>> => {
  return Object.fromEntries(entries) as FromEntries<DeepWriteable<E>>;
};
