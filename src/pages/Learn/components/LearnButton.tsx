import { learnWord } from '@/api/words/learnWord';
import { Button } from '@/components/ui/button';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

export function LearnButton({
  wordId,
  word,
}: {
  wordId: string;
  word: string;
}) {
  const toast = useToast();
  const { start, isLoading } = useAsyncAction(learnWord);
  const handleClickLearn =
    (level: 'easy' | 'hard' | 'normal' | 'mastered' | 'ignore') => () => {
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
    };

  return (
    <div className="relative">
      <div className="flex justify-between gap-4 max-md:gap-2">
        <Button
          onClick={handleClickLearn('ignore')}
          className="w-full max-md:px-2 max-md:py-1"
          variant={'secondary'}
          disabled={isLoading}
          size={'lg'}
        >
          Ignore
        </Button>
        <Button
          onClick={handleClickLearn('hard')}
          className="w-full max-md:px-2 max-md:py-1"
          variant={'destructive'}
          disabled={isLoading}
          size={'lg'}
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
        >
          Mastered
        </Button>
      </div>
    </div>
  );
}
