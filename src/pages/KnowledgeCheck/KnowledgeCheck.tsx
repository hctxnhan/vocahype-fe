import { CarouselNumber } from '@/components/ui/carousel-number';
import { Button } from '@/components/ui/button';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { WordBackground } from './components/WordBackground';
import { getKnowledgeCheck } from '@/api/words/knowledgeCheck';
import useSWR from 'swr';
import { APIData, APIResponse } from '@/models/APIResponse';
import { Word } from '@/models/Word';
import { Loading } from '@/components/layout/Loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { FillParent } from '@/components/layout/FillParent/FillParent';

export function KnowledgeCheck() {
  const { data, isLoading } = useSWR<APIResponse<APIData<Word[]>>>(
    '/words/knowledge-check',
    getKnowledgeCheck
  );

  const words = data?.data.data?.attributes;

  const [{ known, unknown }, setKnownUnknown] = useState<{
    known: string[];
    unknown: string[];
  }>({
    known: [],
    unknown: [],
  });

  const [currentIndex, setCurrentIndex] = useState(1);

  if (isLoading)
    return (
      <FillParent>
        <Loading

        />
      </FillParent>
    );
  if (!words) return <div>Something went wrong</div>;

  const currentWords = words[currentIndex - 1].word;

  const handleClick = (isKnown: boolean) => {
    if (isKnown) {
      setKnownUnknown({
        known: [...known, currentWords],
        unknown,
      });
    } else {
      setKnownUnknown({
        known,
        unknown: [...unknown, currentWords],
      });
    }

    if (currentIndex < words.length) setCurrentIndex(currentIndex + 1);
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="relative h-full gap-16">
      <div className="flex h-full flex-col">
        <div className="flex h-full">
          <div className="center relative flex flex-1 justify-center overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={currentWords}
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
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-rose-500 ">verb</div>
                  <Button variant={'ghost'} size="icon">
                    <SpeakerLoudIcon width={20} height={20} />
                  </Button>
                </div>
                <h1 className="text-6xl font-black">{currentWords}</h1>
              </motion.div>
            </AnimatePresence>
            <WordBackground word={currentWords} />
          </div>
          <div className="relative flex-[0.2] overflow-hidden">
            <CarouselNumber total={words.length} current={currentIndex} />
          </div>
        </div>
        <div className="gap-8 self-end">
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
            className="ml-8 min-w-[200px] bg-gradient-to-b from-cyan-500 from-0% via-cyan-600 via-50% to-cyan-500 to-100% hover:bg-teal-500/80"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
