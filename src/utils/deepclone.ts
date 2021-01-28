import { serialize, deserialize } from 'v8';

/**
 * Clones an object so that values get assigned to a new pointer.
 * @param obj Object to clone
 */
export const clone = (obj: unknown): unknown => {
  if (['string', 'number', 'boolean', 'undefined'].includes(typeof obj)) return obj;
  if (obj === null) return obj;
  if (obj instanceof Function) return obj;
  return deserialize(serialize(obj));
};
