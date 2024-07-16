import useSWR from 'swr';

import { getTopicsList } from '@/api/words/topics';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { TopicItem } from './components/TopicItem';

export function Exploration() {
  useSetBreadcrumb(['Exploration']);
  const { data, isLoading } = useSWR('/topics', getTopicsList);
  console.log(data);
  if (isLoading) {
    return (
      <FillParent>
        <Loading loadingText="Getting topics..." />
      </FillParent>
    );
  }

  const topics = data?.data
    ?.filter(item => item.wordCount > 10)
    .sort((a, b) => b.wordCount - a.wordCount);

  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
      data-tour={TOUR_STEPS.EXPLORATION.SECTION}
    >
      {topics?.map(topic => (
        <TopicItem
          topicCurrentWords={topic.masteredWordCount}
          topicTotalWords={topic.wordCount}
          topicDescription={topic.description}
          topicName={[topic.name, topic.emoji].filter(Boolean).join(' ')}
          topicHref={`/topics/${topic.id}`}
          key={topic.id}
        />
      ))}
    </div>
  );
}
