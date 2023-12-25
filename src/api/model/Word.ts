export interface Word {
  id: string;
  word: string;
  count: number;
  point: number;
  phonetic: string;
  syllable: number;
  phoneticStart: string;
  phoneticEnd: string;
  inSelectedTopic: boolean;
}
