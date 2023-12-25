import dayjs from 'dayjs';
import { useLocation } from 'wouter';

import { Word } from '@/api/model/Word';
import { delayLearnWord, learnWord } from '@/api/words/learnWord';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { cn, getLearningPercentage } from '@/lib/utils/utils';

interface WordItemProps {
  data: Word;
  status: WORD_STATUS_LEARN;
  dueDate: string;
  level?: number;
  onLearnWord: (id: string, index: number) => void;
}

export function WordItem({
  data,
  dueDate,
  level,
  status = WORD_STATUS_LEARN.TO_LEARN,
  onLearnWord,
}: WordItemProps) {
  const { id, word } = data;

  const [, navigate] = useLocation();
  const { start: ignoreWord } = useAsyncAction(learnWord);
  const { start: delayWord } = useAsyncAction(delayLearnWord);
  const toast = useToast();

  const handleClickLearnWord = () => {
    navigate(`/words/${id}`);
  };

  const renderDueDate = () => {
    const due = dayjs().diff(dayjs(dueDate), 'd');
    if (due > 0) return `${due} days overdue`;
    else return 'Due today';
  };

  const handleIgnore = () => {
    ignoreWord([id, 'ignore'], {
      onSuccess: () => {
        toast.success({
          title: `Word "${word}" is added to ignore list`,
        });
        onLearnWord(id, 0);
      },
      onError: () => {
        toast.error({ title: `Failed to add "${word}" to ignore list` });
      },
    });
  };

  const handleDelayWord = (day: number) => () => {
    delayWord([id, day], {
      onSuccess: () => {
        toast.success({
          title: `Word "${word}" will not show up in the list till`,
        });
        onLearnWord(id, 0);
      },
      onError: () => {
        toast.error({ title: `Failed delay "${word}"` });
      },
    });
  };

  return (
    <div
      className="relative mb-2 flex h-[350px] w-[350px] flex-shrink-0 flex-grow-0 basis-auto flex-col justify-between overflow-hidden rounded-lg border border-border bg-muted/70 p-4 max-sm:my-0 max-sm:h-[200px] max-sm:w-full"
      data-tour={TOUR_STEPS.WORD_LIST.CARD.CONTAINER}
    >
      <Progress
        className="absolute inset-x-0 top-0 h-1"
        value={getLearningPercentage(level ?? 0)}
      ></Progress>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-primary">{word}</div>
        <div
          data-tour={TOUR_STEPS.WORD_LIST.CARD.STATUS}
          className={cn('text-base font-bold', {
            'text-destructive': status === WORD_STATUS_LEARN.LEARNING,
            'text-green-600': status === WORD_STATUS_LEARN.TO_LEARN,
          })}
        >
          {status.toUpperCase()}
        </div>
        {dueDate && (
          <div className="text-sm font-medium text-foreground/50">
            {renderDueDate()}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <Button
          variant={'link'}
          onClick={handleIgnore}
          className="text-sm font-bold text-destructive"
          data-tour={TOUR_STEPS.WORD_LIST.CARD.IGNORE}
        >
          IGNORE
        </Button>
        {status === WORD_STATUS_LEARN.LEARNING && (
          <div
            className="flex gap-2"
            data-tour={TOUR_STEPS.WORD_LIST.CARD.DELAY}
          >
            <Button
              variant={'link'}
              onClick={handleDelayWord(7)}
              className="text-sm font-bold text-muted-foreground"
            >
              NEXT WEEK
            </Button>
            <Button
              variant={'link'}
              onClick={handleDelayWord(1)}
              className="text-sm font-bold text-muted-foreground"
            >
              TOMORROW
            </Button>
          </div>
        )}
        <Button
          variant={'link'}
          onClick={handleClickLearnWord}
          className="text-sm font-bold text-primary"
          data-tour={TOUR_STEPS.WORD_LIST.CARD.LEARN}
        >
          LEARN
        </Button>
      </div>
    </div>
  );
}
