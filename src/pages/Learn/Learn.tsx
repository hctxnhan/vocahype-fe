import {
  ChevronDownIcon,
  QuestionMarkCircledIcon,
  SpeakerLoudIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useSWR from 'swr';
import { useRoute } from 'wouter';

import { getImage } from '@/api/pexels/pexels';
import { getWord } from '@/api/words/getWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { TrackLearningTime } from '@/components/layout/TrackLearningTime/TrackLearningTime';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { cn, playAudio } from '@/lib/utils/utils';

import { Example } from './components/Example';
import { LearnButton } from './components/LearnButton';
import { Synonym } from './components/Synonym';

const variants = {
  arrow: {
    open: {
      rotate: 180,
    },
    close: {
      rotate: 0,
    },
  },
  cardImage: {
    open: {
      height: 300,
    },
    close: {
      height: 160,
    },
  },
};

export function Learn() {
  const [currentDef, setCurrentDef] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const nextDef = useRef(1);

  const [, params] = useRoute('/words/:wordId');

  const { data: wordDetail, isLoading } = useSWR(
    ['words/:wordId', params?.wordId ?? ''],
    getWord.bind(null, { wordId: params?.wordId as string } ?? '')
  );

  const wordData = wordDetail?.data[0];

  const { data: wordImage } = useSWR(
    ['pexels', wordData?.word],
    getImage.bind(null, {
      search: wordData?.word ?? '',
    })
  );

  useSetBreadcrumb([
    {
      label: 'Learn',
      href: '/',
    },
    wordData?.word ?? '',
  ]);

  if (isLoading)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!wordData) return null;

  const definitionList = wordData.meanings[0].definitions ?? [];
  const definitionListLength = definitionList?.length ?? 0;
  const currentDefData = definitionList?.[currentDef];
  const exampleList = currentDefData?.examples ?? [];
  const synonymsList =
    wordData.meanings[0].synonyms?.filter(synonym => synonym.isSynonym) ?? [];
  const antonymsList =
    wordData.meanings[0].synonyms?.filter(synonym => !synonym.isSynonym) ?? [];
  const partOfSpeech = wordData.meanings[0].pos;

  const handleClick = (next: number) => {
    const current = currentDef + next;
    if (current >= 0 && current < definitionListLength) {
      nextDef.current = current - currentDef;
      setCurrentDef(current);
    }
  };

  return (
    <TrackLearningTime>
      <div className="relative flex h-full flex-col gap-4">
        <motion.div
          data-tour={TOUR_STEPS.WORD.DETAIL}
          variants={variants.cardImage}
          animate={isOpen ? 'open' : 'close'}
          style={{
            backgroundImage: `url("${
              wordImage?.data.photos[0].src.original ?? ''
            }")`,
          }}
          className="relative h-[160] overflow-hidden rounded-lg bg-cover bg-no-repeat px-16 py-8 text-foreground transition duration-500 bg-center"
        >
          <div className="relative z-30">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black">{wordData.word}</div>
              <Button
                onClick={playAudio.bind(null, wordData.word)}
                variant={'ghost'}
                size="icon"
              >
                <SpeakerLoudIcon width={20} height={20} />
              </Button>
            </div>
            <div className="font-sans font-normal">[{wordData.phonetic}]</div>
            <div className="flex items-center gap-2">
              <div className="font-display font-bold">
                {partOfSpeech?.posTag}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionMarkCircledIcon
                      className="cursor-pointer"
                      width={18}
                      height={18}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text">{partOfSpeech?.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <FillParent className="z-[9] bg-muted/70 transition" />
          <motion.div
            variants={variants.arrow}
            animate={isOpen ? 'open' : 'close'}
            onClick={() => setIsOpen(!isOpen)}
            className="absolute bottom-8 right-8 z-10 h-fit w-fit cursor-pointer"
          >
            <ChevronDownIcon width={30} height={30} />
          </motion.div>
        </motion.div>
        <div data-tour={TOUR_STEPS.WORD.DEFINITION}>
          {definitionListLength > 1 && (
            <div className="flex items-center justify-center gap-16 font-display text-sm font-semibold">
              <div
                onClick={handleClick.bind(null, -1)}
                className={cn(
                  'flex items-center hover:cursor-pointer',
                  currentDef == 0 && 'pointer-events-none text-slate-500'
                )}
              >
                <TriangleLeftIcon width={40} height={40} />
                <div>previous</div>
              </div>
              <div
                onClick={handleClick.bind(null, 1)}
                className={cn(
                  'flex items-center hover:cursor-pointer',
                  currentDef >= definitionListLength - 1 &&
                    'pointer-events-none text-slate-500'
                )}
              >
                <div>next</div>
                <TriangleRightIcon width={40} height={40} />
              </div>
            </div>
          )}

          {/* TODO: Extract to a component */}
          <div className="relative flex items-center justify-center overflow-hidden text-lg font-bold transition-all">
            <AnimatePresence>
              <motion.div
                className="transition-all duration-1000"
                key={currentDef}
                initial={{
                  transform: `translateX(${nextDef.current * 100}px)`,
                  opacity: 0,
                }}
                animate={{
                  transform: 'translateX(0)',
                  opacity: 1,
                }}
                exit={{
                  position: 'absolute',
                  transform: `translateX(${-nextDef.current * 100}px)`,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {currentDefData?.definition}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div
          className="flex-1 basis-0 overflow-auto pb-8"
          data-tour={TOUR_STEPS.WORD.EXAMPLE}
        >
          {exampleList?.map((example, index) => (
            <Example
              key={index}
              className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-300 [&:not(:last-child)]:border-opacity-50"
              example={`“${example.example}”`}
              word={wordData.word}
            />
          ))}
        </div>
        <div className="relative space-y-4">
          <div className="space-y-4" data-tour={TOUR_STEPS.WORD.SYNONYM}>
            <Synonym title="Synonyms" synonymsList={synonymsList} />
            <Synonym title="Antonyms" synonymsList={antonymsList} />
          </div>
          <LearnButton wordId={wordData.id} word={wordData.word} />
        </div>
      </div>
    </TrackLearningTime>
  );
}
