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

  function handleChoose(correct: boolean) {
    if (correct) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  }

  if (isLoading) {
    return (
      <FillParent>
        <Loading loadingText="" />
      </FillParent>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <QuizItem quiz={quiz.data} onChoose={handleChoose} />
  );
}
