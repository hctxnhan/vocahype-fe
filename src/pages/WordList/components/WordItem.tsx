import { useLocation } from 'wouter';

import { Word } from '@/api/model/Word';
import { learnWord } from '@/api/words/learnWord';
import { Button } from '@/components/ui/button';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { WordLevel } from '@/lib/interfaces/word';

interface WordItemProps {
  data: Word;
  onLearnWord: (id: string, index: number) => void;
}

export function WordItem({ data, onLearnWord }: WordItemProps) {
  const { id, word } = data;

  const [, navigate] = useLocation();
  const { start } = useAsyncAction(learnWord);
  const toast = useToast();

  const handleClickLearnWord = () => {
    navigate(`/words/${id}`);
  };

  const handleLearn = (level: WordLevel) => () => {
    start([id, level], {
      onSuccess: () => {
        toast.success({
          title: `Word "${word}" is added to ${level.toUpperCase()} list`,
        });
        onLearnWord(id, 0);
      },
      onError: () => {
        toast.error({ title: `Failed to add "${word}" to ${level} list` });
      },
    });
  };

  return (
    <div className="my-8 flex h-[350px] w-[350px] flex-shrink-0 flex-grow-0 basis-auto flex-col justify-between rounded-lg border-2 border-slate-300 p-4">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-sky-700">{word}</div>
        <div className="text-base font-bold text-rose-600">LEARNING</div>
        <div className="text-sm font-medium text-slate-400">2 days overdue</div>
      </div>
      <div className="flex justify-between">
        <Button
          variant={'link'}
          onClick={handleLearn('ignore')}
          className="text-sm font-bold text-rose-600"
        >
          IGNORE
        </Button>
        <Button
          variant={'link'}
          className="text-sm font-bold text-slate-500"
        >
          NEXT WEEK
        </Button>
        <Button
          variant={'link'}
          className="text-sm font-bold text-slate-500"
        >
          TOMORROW
        </Button>
        <Button
          variant={'link'}
          onClick={handleClickLearnWord}
          className="text-sm font-bold text-sky-600"
        >
          LEARN
        </Button>
      </div>
    </div>
  );
}
