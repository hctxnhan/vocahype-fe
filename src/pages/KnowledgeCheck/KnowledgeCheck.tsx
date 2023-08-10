import {
  getKnowledgeCheck,
  postKnowledgeCheck,
} from '@/api/words/knowledgeCheck';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import { CarouselNumber } from '@/components/ui/carousel-number';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { Word } from '@/models/Word';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
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

  function playAudio() {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    speechSynthesis.speak(utterance);
  }

  if (!currentWord) return null;

  return (
    <>
      <div className="relative h-full gap-16">
        <div className="flex h-full flex-col">
          <div className="flex h-full">
            <div className="center relative flex flex-1 justify-center overflow-hidden">
              <AnimatePresence>
                <motion.div
                  key={currentWord.id}
                  initial={{
                    transform: 'translateY(100px)',
                    opacity: 0,
                  }}
                  animate={{
                    transform: 'translateY(0)',
                    opacity: 1,
                  }}
                  exit={{
                    position: 'absolute',
                    transform: 'translateY(-100px)',
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="z-10 mb-16 flex h-fit flex-col rounded-3xl bg-white px-20 py-16"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-lg font-bold text-rose-500 ">verb</div>
                    <Button onClick={playAudio} variant={'ghost'} size="icon">
                      <SpeakerLoudIcon width={20} height={20} />
                    </Button>
                  </div>
                  <h1 className="text-6xl font-black">{currentWord.word}</h1>
                </motion.div>
              </AnimatePresence>
              <WordBackground word={currentWord.word} />
            </div>
            <div className="relative flex-[0.2] overflow-hidden">
              <CarouselNumber total={words.length} current={currentIndex + 1} />
            </div>
          </div>
          <div className="flex items-center gap-8 self-end">
            <Dialog>
              <DialogTrigger>
                <Button variant={'ghost'}>Restart</Button>
              </DialogTrigger>
              <ResetKnowledgeCheckDialog onConfirm={handleRestart} />
            </Dialog>
            <Button
              onClick={handleClick.bind(null, false)}
              variant={'special'}
              size={'xl'}
              className="min-w-[200px] bg-gradient-to-b from-rose-500 from-0% via-rose-600 via-50% to-rose-400 to-100% hover:bg-rose-500/80"
            >
              No
            </Button>
            <Button
              onClick={handleClick.bind(null, true)}
              variant={'special'}
              size={'xl'}
              className="min-w-[200px] bg-gradient-to-b from-cyan-500 from-0% via-cyan-600 via-50% to-cyan-500 to-100% hover:bg-teal-500/80"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
