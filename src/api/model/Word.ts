import { Meaning } from './Meaning';

export interface Word {
  results?: Meaning[];
  word: string;
  pronunciation?: {
    all: string;
    noun: string;
    verb: string;
  };
  syllables?: {
    count: number;
    list: string[];
  };
  frequency: number;
}
