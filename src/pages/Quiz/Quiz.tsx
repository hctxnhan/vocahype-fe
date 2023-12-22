import { QuizItem } from './components/QuizItem';

export const mockData = {
  question: 'What is the meaning of word "learn"?',
  options: [
    'To teach someone else',
    'To acquire knowledge or skill through study, experience, or teaching',
    'To forget what you once knew',
    'To dance skillfully',
  ],
  answer: '0' as const,
};

interface QuizProps {
  word: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'mastered';
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export function Quiz({
  // word,
  // difficulty,
  onCorrectAnswer,
  onWrongAnswer,
}: QuizProps) {
  function handleChoose(answer: string) {
    if (answer === mockData.answer) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  }

  return <QuizItem onChoose={handleChoose} {...mockData} />;
}
