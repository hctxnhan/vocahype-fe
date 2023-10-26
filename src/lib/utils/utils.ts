import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const preventPropagation = {
  onClick: (e: React.MouseEvent) => e.stopPropagation(),
}

export function getSearchParams<T>(url: string) {
  const urlSearchParams = new URLSearchParams(url);
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  return queryParams as T;
}

export const getSearchParamsCurrentUrl = <T>() => getSearchParams<Partial<T>>(window.location.search);