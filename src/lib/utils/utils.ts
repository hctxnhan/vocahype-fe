import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function playAudio(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
}

export function getFirstNLetter(value: string, n: number) {
  if (n <= 0) return '';
  const result = [];
  const string = value.split(' ');
  for (let i = 0; i < n && i < string.length; i++) {
    result.push(string[i][0]?.toUpperCase());
  }
  return result.join('');
}
