import { WORD_STATUS_LEARN } from '@/lib/enums/word';
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
  status?: WORD_STATUS_LEARN;
  isInTopic?: boolean;
  dueDate?: string;
  level?: number;
}
