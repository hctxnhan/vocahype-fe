import dayjs from 'dayjs';
import { WheelEvent, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import { getLearnWordList } from '@/api/words/learnWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { BreadcrumbItem } from '@/lib/context/breadcrumb.context';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { WordItem } from './components/WordItem';

interface WordListProps {
  breadcrumb: BreadcrumbItem[];
  topicFilter?: string;
  loadingText?: string;
}

export function WordList({
  breadcrumb,
  topicFilter,
  loadingText,
}: WordListProps) {
  useSetBreadcrumb(breadcrumb ?? ['Learn']);

  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  const { user } = useAuthState();

  const { data, mutate, size, setSize, isLoading } = useSWRInfinite(index => {
    const url = new URLSearchParams({
      'filter[topicId]': topicFilter ?? '',
      'page[offset]': (index + 1).toString(),
      'page[limit]': '10',
    });

    return `/words/learn?${url.toString()}`;
  }, getLearnWordList);

  const words = data?.[0].data;

  const countWordStatus = useMemo(
    () =>
      words?.reduce(
        (acc, word) => {
          const comprehension = word.comprehension;
          if (comprehension?.status === WORD_STATUS_LEARN.LEARNING) {
            acc.inProgress++;
            if (dayjs().diff(dayjs(comprehension.dueDate), 'd') > 0) {
              acc.due++;
            }
          }
          return acc;
        },
        {
          inProgress: 0,
          due: 0,
        }
      ),
    [words]
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].data?.length < 5);

  const handleScroll = (event: WheelEvent) => {
    if (isLoading) return;

    const onReachEnd = () => {
      void setSize(size + 1);
    };

    if (isSmallScreen) {
      handleScrollVertical(event, onReachEnd);
    } else {
      handleScrollHorizontal(event, onReachEnd);
    }
  };

  function handleScrollHorizontal(event: WheelEvent, onReachEnd: VoidFunction) {
    const container = event.currentTarget;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
    });

    if (
      container.scrollLeft + container.clientWidth + 200 >=
        container.scrollWidth &&
      !isLoadingMore &&
      isReachingEnd
    ) {
      onReachEnd();
    }
  }
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
      isReachingEnd
    ) {
      onReachEnd();
    }
  }

  const handleLearnWord = (id: string, index: number) => {
    console.error(id, index);
    void mutate();
  };

  if (isLoading && size === 1)
    return (
      <FillParent>
        <Loading loadingText={loadingText} />
      </FillParent>
    );

  if (!words) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="mb-10 flex flex-col gap-2 max-sm:mb-4">
        <p className="text-4xl font-bold leading-normal text-primary max-sm:text-2xl">
          Keep up the good work, {user?.displayName}!
        </p>
        {!!countWordStatus?.inProgress && (
          <p className="text-lg font-medium text-foreground max-sm:text-base">
            Today you have {countWordStatus?.inProgress} words in progress and{' '}
            {countWordStatus?.due && (
              <span className="text-destructive">
                {countWordStatus?.due} word overdue. Pay attention!
              </span>
            )}
          </p>
        )}
      </div>
      <div
        onWheel={handleScroll}
        className="flex gap-2 overflow-auto max-sm:h-full max-sm:flex-col"
        data-tour={TOUR_STEPS.WORD_LIST.LIST}
      >
        {words.length ? (
          words.map((word, index) => {
            const comprehension = word.comprehension;
            return (
              <WordItem
                status={comprehension?.status as WORD_STATUS_LEARN}
                dueDate={comprehension?.dueDate || ''}
                onLearnWord={handleLearnWord.bind(null, word.id, index)}
                data={word}
                key={word.id}
              />
            );
          })
        ) : (
          <div className="h-[350px] w-full text-center">No data to display</div>
        )}
      </div>
    </div>
  );
}
