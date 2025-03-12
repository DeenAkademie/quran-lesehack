import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function snakeToCamel<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel) as unknown as T;
  }

  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      newObj[camelKey] = snakeToCamel((obj as Record<string, unknown>)[key]);
    }
  }
  return newObj as unknown as T;
}

export function hashPassword(password: string) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}
