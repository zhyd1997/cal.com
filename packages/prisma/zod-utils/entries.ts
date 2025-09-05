export const entries = <O extends Record<string, unknown>>(
  obj: O
): {
  readonly [K in keyof O]: [K, O[K]];
}[keyof O][] => {
  return Object.entries(obj) as {
    [K in keyof O]: [K, O[K]];
  }[keyof O][];
};
