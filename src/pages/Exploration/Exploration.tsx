import { TOUR_STEPS } from '@/lib/configs/tour';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { topicOptions } from '@/lib/utils/constant';

import { TopicItem } from './components/TopicItem';

export function Exploration() {
  useSetBreadcrumb(['Exploration']);
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
      data-tour={TOUR_STEPS.EXPLORATION.SECTION}
    >
      {topicOptions.map(topic => (
        <TopicItem
          topicCurrentWords={100}
          topicTotalWords={500}
          topicDescription={topic.description}
          topicName={`${topic.labelString} ${topic.labelEmoji}`}
          topicHref={''}
          key={topic.value}
        />
      ))}
    </div>
  );
}
