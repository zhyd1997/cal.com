import { performance } from "node:perf_hooks";
const target = process.argv[2];
(async () => {
  const t0 = performance.now();
  await import(target);
  const t1 = performance.now();
  console.log(`dynamic import of ${target}: ${(t1 - t0).toFixed(2)} ms`);
})();