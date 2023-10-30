import { QuizItem } from './components/QuizItem';

export const mockData = {
  question: 'What is the meaning of word "learn"?',
  answers: [
    'To teach someone else',
    'To acquire knowledge or skill through study, experience, or teaching',
    'To forget what you once knew',
    'To dance skillfully',
  ],
  correctAnswer: 'B' as const,
};

export function Quiz() {
  return (
    <div>
      <QuizItem
        onChoose={answer => {
          console.log('answer', answer);
        }}
        {...mockData}
      />
    </div>
  );
}
