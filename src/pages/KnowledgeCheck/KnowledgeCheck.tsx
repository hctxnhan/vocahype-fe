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
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { Word } from '@/models/Word';

import { ResetKnowledgeCheckDialog } from './components/ResetKnowledgeCheckDialog';
import { WordBackground } from './components/WordBackground';

export function KnowledgeCheck() {
  const { data, isLoading, mutate, isValidating } = useSWR(
    'words/knowledge-test',
    getKnowledgeCheck
  );

  const { isMutating, trigger } = useSWRMutation(
    'words/knowledge-test',
    postKnowledgeCheck
  );

  useSetBreadcrumb(['Knowledge Check']);

  const words = data?.data.data?.attributes;

  const [{ known, unknown }, setKnownUnknown] = useState<{
    known: Word[];
    unknown: Word[];
  }>({
    known: [],
    unknown: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading || isMutating || isValidating)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!words) return <div>Something went wrong</div>;

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length;

  async function onFinished() {
    await trigger([
      ...known.map(word => ({
        wordId: word.id,
        status: true,
      })),
      ...unknown.map(word => ({
        wordId: word.id,
        status: false,
      })),
    ]);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setKnownUnknown({
      known: [],
      unknown: [],
    });

    void mutate();
  }

  const handleClick = (isKnown: boolean) => {
    if (isKnown) {
      setKnownUnknown({
        known: [...known, currentWord],
        unknown,
      });
    } else {
      setKnownUnknown({
        known,
        unknown: [...unknown, currentWord],
      });
    }

    if (currentIndex < words.length) setCurrentIndex(currentIndex + 1);

    if (isLastWord) {
      void onFinished();
    }
  };

  if (!currentWord) return null;

  return (
    <>
      <div className="relative h-full gap-16">
        <div className="flex h-full flex-col">
          <div className="flex h-full">
            <div className="relative flex flex-1 justify-center overflow-hidden">
              <div className="vh-flex-column z-10 mt-[200px] w-full items-center gap-12">
                <h1 className="font-dinRound text-8xl font-black text-brand-600">
                  {currentWord.word.toUpperCase()}
                </h1>
                <div className="flex gap-6">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={'ghost'}
                        size={'lg'}
                        className="font-normal"
                      >
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
              <WordBackground word={currentWord.word} />
            </div>
            <div className="relative flex-[0.2] overflow-hidden">
              <CarouselNumber total={words.length} current={currentIndex + 1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
