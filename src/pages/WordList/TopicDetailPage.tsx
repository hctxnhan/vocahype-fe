import useSWR from 'swr';
import { useRoute } from 'wouter';

import { getTopicsList } from '@/api/words/topics';

import { WordList } from './WordList';

export function TopicDetailPage() {
  const [_, params] = useRoute('/topics/:topicId');

  const { data, isLoading: isLoadingTopicList } = useSWR(
    '/topics',
    getTopicsList
  );

  if (isLoadingTopicList) return null;

  const topicName = data?.data.find(topic => topic.id.toString() == params?.topicId)?.name;

  if (!topicName) return null;

  return (
    <WordList
      breadcrumb={[
        {
          label: 'Exploration',
          href: '/exploration',
        },
        topicName,
      ]}
      topicFilter={params?.topicId}
      loadingText={`Get all words in topic ${topicName}...`}
    />
  );
}
