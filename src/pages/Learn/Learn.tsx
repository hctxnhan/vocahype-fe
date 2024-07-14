import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useRoute } from 'wouter';

import { getImage } from '@/api/pexels/pexels';
import { getWord } from '@/api/words/getWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { TrackLearningTime } from '@/components/layout/TrackLearningTime/TrackLearningTime';
import { Button } from '@/components/ui/button';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { cn, getLearningPercentage, playAudio } from '@/lib/utils/utils';

import { resetLearnWord } from '@/api/words/learnWord';
import useSWRMutation from 'swr/mutation';
import { Example } from './components/Example';
import { LearnButton } from './components/LearnButton';
import { PronunciationChecking } from './components/PronunciationChecking';
import { ResetWordProgression } from './components/ResetWordProgression';
import { Synonym } from './components/Synonym';

export function Learn() {
  const [, params] = useRoute('/words/:wordId');

  return <Component params={params} key={params?.wordId} />;
}

function Component({ params }: { params: { wordId: string } | null }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: wordDetail, isLoading } = useSWR(
    ['words/:wordId', params?.wordId ?? ''],
    getWord.bind(null, { wordId: params?.wordId as string } ?? '')
  );

  const wordDefinitionGroupByPos =
    useMemo(
      () =>
        wordDetail?.results?.reduce(
          (acc, current) => {
            if (!acc[current.partOfSpeech]) {
              acc[current.partOfSpeech] = [];
            }
            acc[current.partOfSpeech].push(current);
            return acc;
          },
          {} as Record<string, typeof wordDetail.results>
        ),
      [wordDetail?.results]
    ) ?? {};

  const currentSelectedMeaning = useMemo(
    () => Object.values(wordDefinitionGroupByPos)[currentIndex],
    [currentIndex, wordDefinitionGroupByPos]
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

  const handleChangeMeaning = (index: number) => {
    if (!wordDetail.results) return;

    if (currentIndex >= 0 && currentIndex < wordDetail.results.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <TrackLearningTime>
      <div
        className="relative flex h-full flex-col gap-4 overflow-y-auto pr-2"
        key={params?.wordId}
      >
        <div
          data-tour={TOUR_STEPS.WORD.DETAIL}
          style={{
            backgroundImage: `url("${
              wordImage?.data.photos[0].src.original ?? ''
            }")`,
          }}
          className="relative rounded-lg bg-cover bg-center bg-no-repeat px-16 py-8 text-foreground overflow-visible"
        >
          <div className="relative z-30 flex justify-between">
            <div className="font-sans text-xs font-normal">
              {wordDetail.comprehension && (
                <>
                  <p>
                    {`${wordDetail.comprehension?.status.toUpperCase()}${
                      wordDetail.comprehension?.status ===
                      WORD_STATUS_LEARN.LEARNING
                        ? ` - ${getLearningPercentage(
                            wordDetail.comprehension.level ?? 0
                          )}%`
                        : ''
                    }`}{' '}
                  </p>
                  {wordDetail.comprehension?.status !==
                    WORD_STATUS_LEARN.TO_LEARN && (
                    <ResetWordProgression
                      isMutating={isMutating}
                      onConfirm={() => void trigger()}
                    />
                  )}
                </>
              )}
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
        </div>

        <ToggleGroup
          value={currentIndex.toString()}
          onValueChange={value => handleChangeMeaning(+value)}
          type="single"
          className="flex flex-wrap items-center justify-center gap-2 sticky top-4 bg-background/80 z-10 w-fit place-self-center p-2 rounded-lg"
        >
          {Object.keys(wordDefinitionGroupByPos).map((meaning, index) => (
            <ToggleGroupItem
              key={index}
              value={index.toString()}
              className={cn('flex-center flex gap-1 uppercase', {
                'text-foreground': currentIndex != index,
                'text-primary': currentIndex == index,
              })}
            >
              <p className="text-sm font-semibold">
                {meaning === 'undefined' ? 'unknown' : meaning}
              </p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {currentSelectedMeaning?.map(meaning => (
          <div className="flex flex-col gap-3 rounded-lg bg-accent p-8">
            <div className="text-balance text-center font-bold transition-all duration-1000">
              {meaning?.definition}
            </div>

            <div
              className="flex flex-1 basis-0 flex-col gap-4"
              data-tour={TOUR_STEPS.WORD.EXAMPLE}
            >
              {meaning?.examples?.map((example, index) => (
                <Example
                  key={index}
                  className="bg-slate-300/20 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral-300 [&:not(:last-child)]:border-opacity-50 border-black border-1"
                  example={example}
                  word={wordDetail.word}
                />
              ))}
            </div>
            <div className="space-y-4" data-tour={TOUR_STEPS.WORD.SYNONYM}>
              <Synonym
                title="Derivation"
                synonymsList={meaning?.derivation ?? []}
              />
              <Synonym
                title="Similar words"
                synonymsList={meaning?.similarTo ?? []}
              />
              <Synonym title="Type of" synonymsList={meaning?.typeOf ?? []} />
              <Synonym
                title="Synonyms"
                synonymsList={meaning?.synonyms ?? []}
              />
              <Synonym
                title="Antonyms"
                synonymsList={meaning?.antonyms ?? []}
              />
            </div>
          </div>
        ))}
        <div className="relative space-y-4">
          <LearnButton
            status={
              wordDetail.comprehension?.status || WORD_STATUS_LEARN.TO_LEARN
            }
            word={wordDetail.word}
          />
        </div>
      </div>
    </TrackLearningTime>
  );
}
