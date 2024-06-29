export interface WordInTopic {
  id: number;
  word: string;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  emoji: string;
  wordCount: number;
  learningWordCount: number;
  masteredWordCount: number;
  wordInTopic: WordInTopic[];
}