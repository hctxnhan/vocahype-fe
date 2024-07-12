import { ChevronDownIcon, SpeakerLoudIcon } from '@radix-ui/react-icons';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRoute } from 'wouter';

import { getImage } from '@/api/pexels/pexels';
import { getWord } from '@/api/words/getWord';
import { resetLearnWord } from '@/api/words/learnWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { TrackLearningTime } from '@/components/layout/TrackLearningTime/TrackLearningTime';
import { Button } from '@/components/ui/button';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { cn, playAudio } from '@/lib/utils/utils';

import { Example } from './components/Example';
import { LearnButton } from './components/LearnButton';
import { PronunciationChecking } from './components/PronunciationChecking';
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
      height: 'auto',
    },
  },
};

export function Learn() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [, params] = useRoute('/words/:wordId');

  const { data: wordDetail, isLoading } = useSWR(
    ['words/:wordId', params?.wordId ?? ''],
    getWord.bind(null, { wordId: params?.wordId as string } ?? '')
  );

  const { trigger, isMutating } = useSWRMutation(
    ['words/:wordId', params?.wordId ?? ''],
    resetLearnWord.bind(null, params!.wordId)
  );

  const { data: wordImage } = useSWR(
    ['pexels', wordDetail?.word],
    getImage.bind(null, {
      search: wordDetail?.word ?? '',
    })
  );

  useSetBreadcrumb([
    {
      label: 'Learn',
      href: '/',
    },
    wordDetail?.word ?? '',
  ]);

  if (isLoading)
    return (
      <FillParent>
        <Loading />
      </FillParent>
    );

  if (!wordDetail) return null;

  const currentSelectedMeaning = wordDetail.results?.[currentIndex];

  const handleChangeMeaning = (index: number) => {
    if (!wordDetail.results) return;

    if (currentIndex >= 0 && currentIndex < wordDetail.results.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <TrackLearningTime>
      <div
        className="relative flex h-full flex-col gap-4 overflow-y-auto"
        key={params?.wordId}
      >
        <motion.div
          data-tour={TOUR_STEPS.WORD.DETAIL}
          variants={variants.cardImage}
          animate={isOpen ? 'open' : 'close'}
          style={{
            backgroundImage: `url("${
              wordImage?.data.photos[0].src.original ?? ''
            }")`,
          }}
          className="relative h-[160] overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat px-16 py-8 text-foreground transition duration-500"
        >
          <div className="relative z-30 flex justify-between">
            <div className="font-sans text-xs font-normal">
              {/* {`${wordDetail.comprehension.status.toUpperCase()}${
                wordDetail.comprehension.status === WORD_STATUS_LEARN.LEARNING
                  ? ` - ${getLearningPercentage(
                      wordDetail.comprehension.level ?? 0
                    )}%`
                  : ''
              }`}{' '}
              {wordDetail.comprehension.status !==
                WORD_STATUS_LEARN.TO_LEARN && (
                <ResetWordProgression
                  isMutating={isMutating}
                  onConfirm={() => void trigger()}
                />
              )} */}
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black">{wordDetail.word}</div>
                <Button
                  onClick={playAudio.bind(null, wordDetail.word)}
                  variant={'ghost'}
                  size="icon"
                >
                  <SpeakerLoudIcon width={20} height={20} />
                </Button>
              </div>
              {wordDetail.pronunciation?.all && (
                <div className="font-sans font-normal">
                  [{wordDetail?.pronunciation?.all}]
                </div>
              )}
            </div>
            <PronunciationChecking word={wordDetail.word} />
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
        <ToggleGroup
          value={currentIndex.toString()}
          onValueChange={value => handleChangeMeaning(+value)}
          type="single"
          className="flex items-center justify-center gap-2"
        >
          {wordDetail.results?.map((meaning, index) => (
            <ToggleGroupItem
              key={index}
              value={index.toString()}
              className={cn('flex-center flex gap-1', {
                'text-foreground': currentIndex != index,
                'text-primary': currentIndex == index,
              })}
            >
              <p className="text-sm font-semibold">{meaning.partOfSpeech}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="text-balance text-center transition-all duration-1000">
          {currentSelectedMeaning?.definition}
        </div>

        <div className="flex-1 basis-0" data-tour={TOUR_STEPS.WORD.EXAMPLE}>
          {currentSelectedMeaning?.examples?.map((example, index) => (
            <Example
              key={index}
              className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-300 [&:not(:last-child)]:border-opacity-50"
              example={example}
              word={wordDetail.word}
            />
          ))}
        </div>
        <div className="relative space-y-4">
          <div className="space-y-4" data-tour={TOUR_STEPS.WORD.SYNONYM}>
            <Synonym
              title="Derivation"
              synonymsList={currentSelectedMeaning?.derivation ?? []}
            />
            <Synonym
              title="Similar words"
              synonymsList={currentSelectedMeaning?.similarTo ?? []}
            />
            <Synonym
              title="Type of"
              synonymsList={currentSelectedMeaning?.typeOf ?? []}
            />
            <Synonym
              title="Synonyms"
              synonymsList={currentSelectedMeaning?.synonyms ?? []}
            />
            <Synonym
              title="Antonyms"
              synonymsList={currentSelectedMeaning?.antonyms ?? []}
            />
          </div>
          <LearnButton
            // status={wordDetail.comprehension.status}
            status={WORD_STATUS_LEARN.TO_LEARN}
            word={wordDetail.word}
          />
        </div>
      </div>
    </TrackLearningTime>
  );
}
