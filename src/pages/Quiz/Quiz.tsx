import { getQuiz } from '@/api/words/getQuiz';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';

import { QuizItem } from './components/QuizItem';

interface QuizProps {
  word: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'mastered';
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export function Quiz({
  word,
  difficulty,
  onCorrectAnswer,
  onWrongAnswer,
}: QuizProps) {
  const { data: quiz, isLoading } = useAsyncAction(
    getQuiz.bind(null, word, difficulty),
    {
      autoStart: true,
    }
  );

  function handleChoose(answer: string) {
    if (answer === quiz?.data.answer) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  }

  if (isLoading) {
    <FillParent>
      <Loading loadingText="Loading quiz..." />
    </FillParent>;
  }

  return (
    <QuizItem
      options={quiz?.data?.options ?? []}
      question={quiz?.data?.question ?? ''}
      onChoose={handleChoose}
    />
  );
}
