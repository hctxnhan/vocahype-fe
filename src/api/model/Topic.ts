export interface WordInTopic {
  id: number;
  word: string;
}

export interface Topic {
  type: string;
  id: string;
  name: string;
  emoji: string;
  description: string;
  wordCount: number;
  masteredWordCount: number;
}
