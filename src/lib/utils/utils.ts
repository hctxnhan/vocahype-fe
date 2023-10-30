import { type ClassValue, clsx } from 'clsx';
import { parse } from 'regexparam';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
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

export const preventPropagation = {
  onClick: (e: React.MouseEvent) => e.stopPropagation(),
};

export function getSearchParams<T>(url: string) {
  const urlSearchParams = new URLSearchParams(url);
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  return queryParams as T;
}

export const getSearchParamsCurrentUrl = <T>() =>
  getSearchParams<Partial<T>>(window.location.search);

export function secondToFloorMinute(value: number) {
  const minutes = Math.floor(value / 60);
  return minutes;
}

export function dataAttrSelector(attr: string, value: string) {
  return `[data-${attr}="${value}"]`;
}

export function whatIsCurrentPage(location: string) {
  return {
    learn: parse('/').pattern.test(location),
    learnWord: parse('/words/:wordId').pattern.test(location),
    knowledgeCheck: parse('/knowledge-check').pattern.test(location),
    exploration: parse('/exploration').pattern.test(location),
    profile: parse('/profile').pattern.test(location),
  };
}

export function testPathRegex(path: string) {
  return parse(path).pattern;
}
