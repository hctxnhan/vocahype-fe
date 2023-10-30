import { useState } from 'react';

import { learnWord } from '@/api/words/learnWord';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { QuizAnswer, WordLevel } from '@/lib/interfaces/type';
import { mockData } from '@/pages/Quiz/Quiz';
import { QuizItem } from '@/pages/Quiz/components/QuizItem';

export function LearnButton({
  wordId,
  word,
}: {
  wordId: string;
  word: string;
}) {
  const toast = useToast();
  const { start, isLoading } = useAsyncAction(learnWord);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLevel, setQuizLevel] = useState<
    'easy' | 'normal' | 'hard' | 'mastered'
  >();

  const handleClickLearn = (level: WordLevel) => () => {
    if (level !== 'ignore' && level !== 'hard') {
      setShowQuiz(true);
      setQuizLevel(level);
      return;
    }

    handleLearn(level);
  };

  function handleLearn(level: WordLevel) {
    start([wordId, level], {
      onSuccess: () => {
        toast.success({
          title: `Word "${word}" is added to ${level.toUpperCase()} list`,
        });
      },
      onError: () => {
        toast.error({ title: `Failed to add "${word}" to ${level} list` });
      },
    });
  }

  function handleQuizAnswer(answer: QuizAnswer) {
    if (!quizLevel) return;

    setShowQuiz(false);
    setQuizLevel(undefined);

    if (answer !== mockData.correctAnswer) {
      toast.error({ title: `Wrong answer` });
    } else {
      toast.success({ title: `Correct answer` });
      handleLearn(quizLevel);
    }
  }

  return (
    <div
      className="relative"
      data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.CONTAINER}
    >
      <div className="flex justify-between gap-4 max-md:gap-2">
        <Button
          onClick={handleClickLearn('ignore')}
          className="w-full max-md:px-2 max-md:py-1"
          variant={'secondary'}
          disabled={isLoading}
          size={'lg'}
          data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.IGNORE}
        >
          Ignore
        </Button>
        <Button
          onClick={handleClickLearn('hard')}
          className="w-full max-md:px-2 max-md:py-1"
          variant={'destructive'}
          disabled={isLoading}
          size={'lg'}
          data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.HARD}
        >
          Hard
        </Button>

        <Button
          onClick={handleClickLearn('normal')}
          className="w-full max-md:px-2 max-md:py-1"
          color="orange"
          disabled={isLoading}
          size={'lg'}
        >
          Normal
        </Button>

        <Button
          onClick={handleClickLearn('easy')}
          className="w-full max-md:px-2 max-md:py-1"
          color="yellow"
          size={'lg'}
        >
          Easy
        </Button>

        <Button
          color="green"
          onClick={handleClickLearn('mastered')}
          className="w-full max-md:px-2 max-md:py-1"
          disabled={isLoading}
          size={'lg'}
          data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.MASTERED}
        >
          Mastered
        </Button>
      </div>
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Choose the correct answer to add this word to {quizLevel} list
            </DialogTitle>
          </DialogHeader>
          <QuizItem onChoose={handleQuizAnswer} {...mockData} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
