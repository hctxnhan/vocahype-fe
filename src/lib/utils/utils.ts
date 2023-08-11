import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


export function playAudio(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
}