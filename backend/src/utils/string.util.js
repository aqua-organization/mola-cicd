export function normalizeKey(key) {
  return key
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s/g, "_")
    .toLowerCase();
}
