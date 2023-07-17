import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export function vh(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
