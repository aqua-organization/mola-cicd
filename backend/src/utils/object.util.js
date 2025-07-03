import { normalizeKey } from "./string.util.js";

export function normalizeObjectKeys(obj) {
  const cleanObj = {};
  for (const rawKey in obj) {
    const key = normalizeKey(rawKey);
    cleanObj[key] = obj[rawKey];
  }
  return cleanObj;
}
