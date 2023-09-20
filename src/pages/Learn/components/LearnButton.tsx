import { learnWord } from '@/api/words/learnWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
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
          toast.success({ title: `Word "${word}" is added to ${level.toUpperCase()} list` });
        },
        onError: () => {
          toast.error({ title: `Failed to add "${word}" to ${level} list` });
        },
      });
    };

  return (
    <>
      {isLoading && (
        <FillParent
          className='bg-black/70 z-[9998] rounded-md'
        >
          <Loading />
        </FillParent>
      )}

      <div className="flex justify-between gap-4">
        <Button
          onClick={handleClickLearn('ignore')}
          className="w-full"
          variant={'secondary'}
          size={'lg'}
        >
          Ignore
        </Button>
        <Button
          onClick={handleClickLearn('hard')}
          className="w-full"
          variant={'destructive'}
          size={'lg'}
        >
          Hard
        </Button>
        <Button
          onClick={handleClickLearn('normal')}
          className="w-full"
          color='orange'
          size={'lg'}
        >
          Normal
        </Button>
        <Button
          onClick={handleClickLearn('easy')}
          className="w-full"
          size={'lg'}
        >
          Easy
        </Button>
        <Button
          color='green'
          onClick={handleClickLearn('mastered')}
          className="w-full"
          size={'lg'}
        >
          Mastered
        </Button>
      </div>
    </>
  );
}
