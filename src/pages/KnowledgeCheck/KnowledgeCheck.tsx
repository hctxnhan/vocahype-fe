import { Dialog } from '@radix-ui/react-dialog';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
  getKnowledgeCheck,
  postKnowledgeCheck,
} from '@/api/words/knowledgeCheck';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import { CarouselNumber } from '@/components/ui/carousel-number';
import { DialogTrigger } from '@/components/ui/dialog';
import { Link } from '@/components/ui/link';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { ResetKnowledgeCheckDialog } from './components/ResetKnowledgeCheckDialog';
import { WordBackground } from './components/WordBackground';

export function KnowledgeCheck() {
  const isLessThanLarge = useMediaQuery('(max-width: 1024px)');

  const { data, isLoading, mutate, isValidating } = useSWR(
    'words/knowledge-test',
    getKnowledgeCheck
  );

  const {
    data: estimateData,
    isMutating,
    trigger,
  } = useSWRMutation('words/knowledge-test', postKnowledgeCheck);

  useSetBreadcrumb(['Knowledge Check']);

  const words = data?.data;

  const [{ known, unknown }, setKnownUnknown] = useState<{
    known: string[];
    unknown: string[];
  }>({
    known: [],
    unknown: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (isLoading || isMutating || isValidating)
    return (
      <FillParent>
        <Loading loadingText="Getting words..." />
      </FillParent>
    );

  if (!words) return <div>Something went wrong</div>;

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  async function onFinished() {
    await trigger([
      ...known.map(word => ({
        word,
        status: true,
      })),
      ...unknown.map(word => ({
        word,
        status: false,
      })),
    ]);

    setIsFinished(true);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setKnownUnknown({
      known: [],
      unknown: [],
    });
    setIsFinished(false);

    void mutate();
  }

  const handleClick = (isKnown: boolean) => {
    if (isKnown) {
      setKnownUnknown({
        known: [...known, currentWord.id],
        unknown,
      });
    } else {
      setKnownUnknown({
        known,
        unknown: [...unknown, currentWord.id],
      });
    }

    if (!isLastWord) setCurrentIndex(currentIndex + 1);
    else {
      void onFinished();
    }
  };

  if (!currentWord) return null;

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden max-lg:flex-col">
      {estimateData && isFinished ? (
        <div className="max-w-[500px] space-y-6 text-2xl">
          <p className="font-display text-3xl">Congratulations!</p>
          <p>
            We estimated that your vocabulary size is{' '}
            <span className="font-bold">{estimateData.data.estimate}</span>{' '}
            words based on test result built from top 3000 most popular words.
          </p>
          <Link href="/">
            <Button className="text-base" variant={'outline'}>
              Go to learn page
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="relative flex flex-1 items-center justify-center">
            <div className="vh-flex-column z-10 -mt-16 w-full items-center gap-12">
              <h1 className="font-dinRound text-8xl font-black text-primary max-md:text-5xl">
                {currentWord.word.toUpperCase()}
              </h1>
              <div className="flex gap-6 max-sm:flex-col-reverse">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'outline'} size={'lg'}>
                      Restart
                    </Button>
                  </DialogTrigger>
                  <ResetKnowledgeCheckDialog onConfirm={handleRestart} />
                </Dialog>
                <Button
                  variant={'destructive'}
                  onClick={handleClick.bind(null, false)}
                  size={'lg'}
                >
                  I don’t know
                </Button>
                <Button onClick={handleClick.bind(null, true)} size={'lg'}>
                  Known already
                </Button>
              </div>
            </div>
          </div>
          <div className="relative h-full w-full flex-[0.2]">
            <CarouselNumber
              direction={isLessThanLarge ? 'horizontal' : 'vertical'}
              total={words.length}
              current={currentIndex + 1}
            />
          </div>
          <WordBackground word={currentWord.word} />
        </>
      )}
    </div>
  );
}
