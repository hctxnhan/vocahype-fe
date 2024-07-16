export enum QuizType {
  DEFINITION_SINGLE_SELECT = 'definition_single_select',
  DEFINITION_MULTIPLE_SELECT = 'definition_multiple_select',
  TRUE_FALSE = 'true_false',
  RELATED_WORD_SELECT = 'related_word_select',
  ANTONYM_SYNONYM_MATCH = 'antonym_synonym_match',
  WORD_GUESS = 'word_guess',
  WORD_SCRAMBLE = 'word_scramble',
}

export interface Quiz {
  type: QuizType;
  question: string;
  word: string;
}

export interface SelectionQuiz extends Quiz {
  type: QuizType.DEFINITION_SINGLE_SELECT | QuizType.DEFINITION_MULTIPLE_SELECT;
  result: Result[];
}

export interface TrueFalseQuiz extends Quiz {
  type: QuizType.TRUE_FALSE;
  result: 'true' | 'false';
  statement: string;
}

export interface WordGuessQuiz extends Quiz {
  type: QuizType.WORD_GUESS;
  description: string;
}

export interface WordScrambleQuiz extends Quiz {
  type: QuizType.WORD_SCRAMBLE;
  result: string;
}

interface Result {
  text: string;
  correct: boolean;
}

export interface QuizCompProps<Q extends Quiz> {
  question: Q;
  onChoose: (correct: boolean) => void;
}
