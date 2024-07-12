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
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { WordLevel } from '@/lib/interfaces/type';
import { Quiz } from '@/pages/Quiz/Quiz';

type QuizLevel = 'easy' | 'normal' | 'hard';

const mapDifficultyToLevel: Partial<Record<WordLevel, QuizLevel>> = {
  easy: 'normal',
  normal: 'easy',
  mastered: 'hard',
};

export function LearnButton({
  word,
  status,
}: {
  word: string;
  status: WORD_STATUS_LEARN;
}) {
  const toast = useToast();
  const { start, isLoading } = useAsyncAction(learnWord);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLevel, setQuizLevel] = useState<QuizLevel | undefined>();

  const handleClickLearn = (level: WordLevel) => () => {
    if (level !== 'ignore' && level !== 'hard') {
      setShowQuiz(true);
      setQuizLevel(mapDifficultyToLevel[level] || undefined);
      return;
    }

    handleLearn(level);
  };

  function handleLearn(level: WordLevel) {
    start([word, level], {
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

  function handleWrongAnswer() {
    setShowQuiz(false);
    setQuizLevel(undefined);
    toast.error({ title: `Wrong answer` });
  }

  function handleCorrectAnswer() {
    setShowQuiz(false);
    setQuizLevel(undefined);
    if (!quizLevel) return;

    toast.success({ title: `Correct answer` });
    handleLearn(quizLevel);
  }

  const mastered = status === WORD_STATUS_LEARN.MASTERED && (
    <Button
      onClick={handleClickLearn('mastered')}
      className="w-full uppercase max-md:px-2 max-md:py-1"
      size={'lg'}
      variant={'outline'}
      data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.MASTERED}
      disabled={true}
    >
      Mastered
    </Button>
  );

  const ignored = status === WORD_STATUS_LEARN.IGNORE && (
    <Button
      onClick={handleClickLearn('mastered')}
      className="w-full uppercase max-md:px-2 max-md:py-1"
      size={'lg'}
      variant={'outline'}
      data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.IGNORE}
      disabled={true}
    >
      Ignored
    </Button>
  );

  const learning = [
    WORD_STATUS_LEARN.LEARNING,
    WORD_STATUS_LEARN.TO_LEARN,
  ].includes(status) && (
    <>
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
    </>
  );

  return (
    <div
      className="sticky flex flex-col gap-1"
      data-tour={TOUR_STEPS.WORD.LEARN_BUTTON.CONTAINER}
    >
      <div className="flex justify-between gap-4 max-md:gap-2">
        {mastered}
        {ignored}
        {learning}
      </div>
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Choose the correct answer to add this word to {quizLevel} list
            </DialogTitle>
          </DialogHeader>
          <Quiz
            word={word}
            difficulty={quizLevel ?? 'easy'}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
