// Wait for `ms` milliseconds
// If `ms` is not provided, wait for a second
export async function wait(ms?: number) {
  await new Promise((res) => setTimeout(res, ms ?? 1000));
}
