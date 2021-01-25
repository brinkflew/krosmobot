import { serialize, deserialize } from 'v8';

export const clone = (obj: Record<string | number, unknown>) => deserialize(serialize(obj));
