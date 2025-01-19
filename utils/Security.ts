export function generateHash(seed: number | string) {
  const time = Date.now().toString();
  const n = time.length;
  const n_half = n >> 1;
  const seedStr = time
    .substring(0, n_half)
    .concat(`-${seed}-`)
    .concat(time.substring(n_half));
  return encodeURIComponent(btoa(seedStr));
}

export function decodeHash(hash: string) {
  const b64 = decodeURIComponent(hash);
  const seedStr = atob(b64);
  const nums = seedStr.split("-");

  return nums[1];
}
