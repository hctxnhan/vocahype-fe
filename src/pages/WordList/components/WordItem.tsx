import dayjs from 'dayjs';
import { useLocation } from 'wouter';

import { Word } from '@/api/model/Word';
import { delayLearnWord, learnWord } from '@/api/words/learnWord';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { cn, getLearningPercentage } from '@/lib/utils/utils';
import { SparkleIcon } from 'lucide-react';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';

interface WordItemProps {
  data: Word;
  status: WORD_STATUS_LEARN;
  dueDate: string;
  level?: number;
  onLearnWord: (id: string, index: number) => void;
}

enum WordReviewPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export function WordItem({
  data,
  dueDate,
  level,
  status = WORD_STATUS_LEARN.TO_LEARN,
  onLearnWord,
}: WordItemProps) {
  const { word, isInTopic } = data;

  const [, navigate] = useLocation();
  const { start: ignoreWord, isLoading: isIgnoringWord } =
    useAsyncAction(learnWord);
  const { start: delayWord, isLoading: isDelayingWord } =
    useAsyncAction(delayLearnWord);
  const toast = useToast();

  const handleClickLearnWord = () => {
    navigate(`/words/${word}`);
  };

  const renderDueDate = () => {
    const due = dayjs().diff(dayjs(dueDate), 'd');
    if (due > 0)
      return {
        text: `Overdue by ${due} days`,
        priority: WordReviewPriority.HIGH,
      };
    else if (due === 0)
      return { text: 'Due today', priority: WordReviewPriority.MEDIUM };
    else
      return {
        text: `${Math.abs(due)} days to next review`,
        priority: WordReviewPriority.LOW,
      };
  };

  const handleIgnore = () => {
    ignoreWord([word, 'ignore'], {
      onSuccess: () => {
        toast.success({
          title: `Word "${word}" is added to ignore list`,
        });
        onLearnWord(word, 0);
      },
      onError: () => {
        toast.error({ title: `Failed to add "${word}" to ignore list` });
      },
    });
  };

  const handleDelayWord = (day: number) => () => {
    delayWord([word, day], {
      onSuccess: () => {
        toast.success({
          title: `Word "${word}" will not show up in the list till`,
        });
        onLearnWord(word, 0);
      },
      onError: () => {
        toast.error({ title: `Failed delay "${word}"` });
      },
    });
  };

  const isLoading = isIgnoringWord || isDelayingWord;

  return (
    <div
      className="relative my-0 mb-2 flex w-full flex-shrink-0 flex-grow-0 basis-auto items-center justify-between overflow-hidden rounded-lg border border-border bg-muted/70 p-4"
      data-tour={TOUR_STEPS.WORD_LIST.CARD.CONTAINER}
    >
      <Progress
        className="absolute inset-x-0 top-0 h-1 bg-slate-200"
        value={getLearningPercentage(level ?? 0)}
      ></Progress>
      {isLoading && <FillParent className="bg-muted/80"></FillParent>}

      <div className="flex gap-4">
        <div className="text-2xl font-bold text-primary">{word}</div>
        {dueDate && (
          <Badge
            className={cn('w-fit text-xs font-normal', {
              'bg-red-500 text-background hover:bg-red-600 hover:text-background':
                renderDueDate().priority === WordReviewPriority.HIGH,
              'bg-yellow-500 text-background hover:bg-yellow-600 hover:text-background':
                renderDueDate().priority === WordReviewPriority.MEDIUM,
              'bg-green-500 text-background hover:bg-green-600 hover:text-background':
                renderDueDate().priority === WordReviewPriority.LOW,
            })}
          >
            {renderDueDate().text}
          </Badge>
        )}
        {isInTopic && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="">
                <Badge
                  className="border-orange-500 bg-orange-500 text-xs font-normal uppercase text-background"
                  variant="outline"
                >
                  Topic
                  <SparkleIcon className="ml-1 h-4 w-4" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text">
                  This word belongs to the topic that you have selected in
                  profile settings.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant={'link'}
          onClick={handleIgnore}
          className="text-sm font-bold text-destructive"
          data-tour={TOUR_STEPS.WORD_LIST.CARD.IGNORE}
        >
          IGNORE
        </Button>
        {status === WORD_STATUS_LEARN.LEARNING && (
          <>
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
          </>
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
