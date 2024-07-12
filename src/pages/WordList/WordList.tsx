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

  const { user } = useAuthState();

  const { data, mutate, size, setSize, isLoading } = useSWRInfinite(index => {
    const url = new URLSearchParams({
      'filter[topicId]': topicFilter ?? '',
      'page[offset]': (index + 1).toString(),
      'page[limit]': '10',
    });

    return `/words/learn?${url.toString()}`;
  }, getLearnWordList);

  const words = data ? data.flatMap(page => page.data) : [];

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
    <div className="limit-content-to-min-height flex flex-1 flex-col overflow-hidden">
      <div className="mb-4 flex flex-col gap-2">
        <p className="text-4xl font-bold leading-normal text-primary max-sm:text-2xl">
          Keep up the good work, {user?.displayName}!
        </p>
      </div>
      <div
        onWheel={handleScroll}
        className="flex h-[calc(100%-5rem)] flex-col gap-2 overflow-auto"
        data-tour={TOUR_STEPS.WORD_LIST.LIST}
      >
        {words.length ? (
          words.map((word) => {
            const comprehension = word.comprehension;
            return (
              <WordItem
                status={comprehension?.status as WORD_STATUS_LEARN}
                level={comprehension?.level || 0}
                dueDate={comprehension?.dueDate || ''}
                onLearnWord={handleLearnWord}
                data={word}
                key={word.word}
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
