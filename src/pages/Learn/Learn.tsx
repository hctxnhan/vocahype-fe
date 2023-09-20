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

import { getWord } from '@/api/words/getWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

  const wordData = wordDetail?.data[0].attributes;

  useSetBreadcrumb(['Learn', wordData?.word ?? '']);

  if (isLoading)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!wordData) return null;

  const definitionList = wordDetail.relationships.definitions;
  const partOfSpeech = wordDetail.firstIncludedByType('pos')?.attributes;
  const exampleList = wordDetail.includedByType('example');

  const synonymsList =
    wordDetail
      .includedByType('synonym')
      ?.filter(synonym => synonym.attributes.isSynonym)
      .map(synonym => synonym.attributes) ?? [];
  const antonymsList =
    wordDetail
      .includedByType('synonym')
      ?.filter(synonym => !synonym.attributes.isSynonym)
      .map(synonym => synonym.attributes) ?? [];

  const definitionListLength = definitionList?.data?.length ?? 0;

  const currentDefData =
    definitionListLength > 0
      ? {
        id: definitionList.data[currentDef]?.id,
        data: wordDetail.getIncludedByTypeAndId(
          'definition',
          definitionList.data[currentDef]?.id
        )?.attributes.definition,
      }
      : {
        id: '',
        data: '',
      };

  const handleClick = (next: number) => {
    const current = currentDef + next;
    if (current >= 0 && current < definitionList.data.length) {
      nextDef.current = current - currentDef;
      setCurrentDef(current);
    }
  };

  return (
    <div className="relative flex h-full flex-col gap-4">
      <motion.div
        variants={variants.cardImage}
        animate={isOpen ? 'open' : 'close'}
        style={{
          backgroundImage: `url("https://static.theprint.in/wp-content/uploads/2022/04/Web_Photo_Editor-71-1024x576.jpg?compress=true")`,
        }}
        className="relative h-[160] overflow-hidden rounded-lg bg-cover bg-no-repeat px-16 py-8 text-white transition duration-500"
      >
        <div className=" relative z-50">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black">
              {wordData.word}
            </div>
            <Button
              onClick={playAudio.bind(null, wordData.word)}
              variant={'ghost'}
              size="icon"
            >
              <SpeakerLoudIcon width={20} height={20} />
            </Button>
          </div>
          <div className="font-sans font-normal">
            [{wordData.phonetic}]
          </div>
          <div className="flex items-center gap-2">
            <div className="font-display font-bold">{partOfSpeech?.posTag}</div>
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
        <FillParent className="z-[9] bg-slate-800/50 transition" />
        <motion.div
          variants={variants.arrow}
          animate={isOpen ? 'open' : 'close'}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bottom-8 right-8 z-10 h-fit w-fit cursor-pointer"
        >
          <ChevronDownIcon width={30} height={30} />
        </motion.div>
      </motion.div>
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
              currentDef >= definitionList.data.length - 1 &&
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
            {currentDefData.data}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex-1 basis-0 overflow-auto pb-8">
        {exampleList?.map((example, index) => (
          <Example
            key={index}
            className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-300 [&:not(:last-child)]:border-opacity-50"
            example={`“${example.attributes.example}”`}
            word={wordData.word}
          />
        ))}
      </div>
      <div>
        <div className="vh-flex-column gap-2 mb-2">
          <Synonym title="Synonyms" synonymsList={synonymsList} />
          <Synonym title="Antonyms" synonymsList={antonymsList} />
        </div>
        
        <LearnButton wordId={wordData.id} word={wordData.word} />
      </div>
    </div>
  );
}
