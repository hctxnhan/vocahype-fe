export type Word = {
  id: number;
  word: string;
  count: number;
  point: number;
  phonetic: string;
  syllable: number;
  phoneticStart: string;
  phoneticEnd: string;
};

export type PartOfSpeech = {
  posTag: string;
  description: string;
};

export type Definition = {
  id: number;
  definition: string;
};

export type Example = {
  id: number;
  example: string;
};
