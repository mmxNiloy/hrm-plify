/**
 * @param text String
 * @description String to shorten.
 * @param maxLength Number
 * @description Number of characters to take before shortening.
 * @default 24
 * @returns String
 * @description shortened string followed by Ellipsis (...)
 */
export function shortenText(text?: string, maxLength?: number) {
  if (!text) return "";
  const n = Math.max(0, maxLength ?? 24);
  if (text.length <= n) return text;
  return `${text.substring(0, n)}...`;
}
