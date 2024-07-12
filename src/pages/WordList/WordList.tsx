import { WheelEvent } from 'react';
import useSWRInfinite from 'swr/infinite';

import { getLearnWordList } from '@/api/words/learnWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { BreadcrumbItem } from '@/lib/context/breadcrumb.context';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { WordItem } from './components/WordItem';
import { cn } from '@/lib/utils/utils';
import { useMatchMutate } from '@/lib/hooks/useMatchMutate';

interface WordListProps {
  breadcrumb: BreadcrumbItem[];
  topicFilter?: string;
  loadingText?: string;
  needToFinishLearning?: boolean;
}

export function WordList({
  breadcrumb,
  topicFilter,
  loadingText,
  needToFinishLearning = false,
}: WordListProps) {
  useSetBreadcrumb(breadcrumb ?? ['Learn']);

  const { user } = useAuthState();

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    index => {
      const url = new URLSearchParams({
        'filter[topicId]': topicFilter ?? '',
        'page[offset]': (index + 1).toString(),
        'page[limit]': '10',
      });

      return `/words/learn?${url.toString()}`;
    },
    getLearnWordList,
    {
      keepPreviousData: true,
    }
  );

  const mutateMatch = useMatchMutate();

  const words = data ? data.flatMap(page => page.data) : [];
  const learningWords = words.filter(
    word => word && word.status === WORD_STATUS_LEARN.LEARNING
  );
  const toLearnWords = words.filter(
    word => word && word.status === WORD_STATUS_LEARN.TO_LEARN
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].data?.length < 10);

  const handleScroll = (event: WheelEvent) => {
    if (isLoading) return;

    const onReachEnd = () => {
      void setSize(size + 1);
    };

    // if (isSmallScreen) {
    handleScrollVertical(event, onReachEnd);
    // } else {
    //   handleScrollHorizontal(event, onReachEnd);
    // }
  };

  // function handleScrollHorizontal(event: WheelEvent, onReachEnd: VoidFunction) {
  //   const container = event.currentTarget;
  //   const scrollAmount = event.deltaY;

  //   container.scrollTo({
  //     top: 0,
  //     left: container.scrollLeft + scrollAmount,
  //   });

  //   if (
  //     container.scrollLeft + container.clientWidth + 200 >=
  //       container.scrollWidth &&
  //     !isLoadingMore &&
  //     !isReachingEnd
  //   ) {
  //     onReachEnd();
  //   }
  // }

  function handleScrollVertical(event: WheelEvent, onReachEnd: VoidFunction) {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: container.scrollTop + scrollAmount,
      left: 0,
    });

    if (
      container.scrollTop + container.clientHeight + 200 >=
        container.scrollHeight &&
      !isLoadingMore &&
      !isReachingEnd
    ) {
      onReachEnd();
    }
  }

  const handleLearnWord = () => {
    mutateMatch(/\/words\/learn/gi);
  };

  if (isLoading && size === 1)
    return (
      <FillParent>
        <Loading loadingText={loadingText} />
      </FillParent>
    );

  if (!words)
    return (
      <div className="text-center font-display text-xl font-bold text-primary">
        Something went wrong
      </div>
    );

  return (
    <div className="limit-content-to-min-height flex flex-1 flex-col overflow-hidden">
      <div className="mb-4 flex flex-col gap-2">
        <p className="text-4xl font-bold leading-normal text-primary max-sm:text-2xl">
          Keep up the good work, {user?.displayName}!
        </p>
      </div>
      <div
        onWheel={handleScroll}
        className="relative flex h-[calc(100%-5rem)] flex-col gap-2 overflow-auto pr-2"
        data-tour={TOUR_STEPS.WORD_LIST.LIST}
      >
        {words.length === 0 && !isValidating && (
          <div className="text-center font-display text-xl text-primary">
            There're nothing to learn right now. Please come back later!
          </div>
        )}
        {learningWords.length > 0 && (
          <div className="pb-6">
            <p className="relative mb-2 w-full font-display font-bold text-red-500">
              Learning
            </p>
            {learningWords.map(word => {
              return (
                <WordItem
                  status={word?.status as WORD_STATUS_LEARN}
                  level={word?.level || 0}
                  dueDate={word?.dueDate || ''}
                  onLearnWord={handleLearnWord}
                  data={word}
                  key={word.word}
                />
              );
            })}
          </div>
        )}

        {learningWords.length > 0 && needToFinishLearning && (
          <div className="cross-line text-balance sticky top-0 text-center text-neutral-400 z-[1001]">
            please finish all the learning words first
          </div>
        )}

        {toLearnWords.length > 0 && (
          <div
            className={cn({
              'pointer-events-none relative':
                learningWords.length > 0 && needToFinishLearning,
            })}
          >
            <FillParent
              className={cn({
                'block-background z-[1000] rounded-lg':
                  learningWords.length > 0 && needToFinishLearning,
              })}
            ></FillParent>
            <p className="mb-2 w-full font-display font-bold text-green-500">
              To Learn
            </p>
            {toLearnWords.map(word => {
              return (
                <WordItem
                  status={word?.status as WORD_STATUS_LEARN}
                  level={word?.level || 0}
                  dueDate={word?.dueDate || ''}
                  onLearnWord={handleLearnWord}
                  data={word}
                  key={word.word}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
