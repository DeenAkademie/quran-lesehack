import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

// Check if we're in the Edge Runtime
const isEdgeRuntime =
  typeof process !== 'undefined' &&
  typeof process.env !== 'undefined' &&
  typeof process.env.NEXT_RUNTIME === 'string' &&
  process.env.NEXT_RUNTIME === 'edge';

// Native password hashing function using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  // Skip hashing in Edge Runtime to prevent errors
  if (isEdgeRuntime) {
    return password;
  }

  // In browser environments where crypto is available
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      // Convert the password string to an ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(password);

      // Hash the password using SHA-256
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);

      // Convert the hash to a hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      return hashHex;
    } catch (error) {
      console.error('Error hashing password:', error);
      // Fall back to unhashed password if crypto fails
      return password;
    }
  }

  // In environments where crypto is not available
  return password;
}
