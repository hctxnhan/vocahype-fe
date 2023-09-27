import { WORD_STATUS_LEARN } from '@/lib/enums/word';

export interface Comprehension {
  dueDate: string;
  level: number;
  status: WORD_STATUS_LEARN;
  id: string;
}
