import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useLocation, useRoute } from 'wouter';

import { updateTopic } from '@/api/words/manageTopic';
import { getTopic } from '@/api/words/topics';
import { ApplicationError } from '@/components/layout/ErrorPage/ApplicationError';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Input } from '@/components/ui/input';
import { useMatchMutate } from '@/lib/hooks/useMatchMutate';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { useToast } from '@/lib/hooks/useToast';

import { AddWordManuallyForm } from '../CreateNewTopic/AddWordManuallyForm';

export function UpdateTopic() {
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const [, params] = useRoute('/admin/edit-topic/:topicId');

  const topicId = params?.topicId ? Number(params.topicId) : 0;

  const changesRef = useRef({
    addedWordIds: [] as string[],
    removedWordIds: [] as string[],
  });

  const handleSelectValue = (value: string) => {
    setSelectedValue([...selectedValue, value]);
    changesRef.current.addedWordIds.push(value);
  };

  const handleRemoveValue = (value: string) => {
    setSelectedValue(selectedValue.filter(v => v !== value));
    changesRef.current.removedWordIds.push(value);
  };

  const mutate = useMatchMutate();
  useSetBreadcrumb([
    {
      label: 'Admin',
      href: '/admin',
    },
    'Update Topic',
  ]);

  const toast = useToast();
  const [, navigate] = useLocation();

  const { isMutating, trigger } = useSWRMutation(
    ['update-topic-detail'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - fix this
    updateTopic
  );

  const { data: topicDetail, isLoading: isLoadingTopic } = useSWR(
    topicId ? ['topic/:topicId', topicId] : null,
    getTopic.bind(null, topicId)
  );

  const topic = useMemo(() => {
    if (!topicDetail || isLoadingTopic) {
      return null;
    }

    const topic = topicDetail.data[0];
    return {
      name: topic.name,
      description: topic.description,
      wordList: topic.wordInTopic.map(item => item.word),
    };
  }, [topicDetail, isLoadingTopic]);

  useEffect(() => {
    if (topic) {
      setTopicName(topic.name);
      setTopicDescription(topic.description);
      setSelectedValue(topic.wordList);
    }
  }, [topic]);

  async function handleUpdateTopic(wordIds: string[]) {
    if (!topicName || !topicDescription || !wordIds.length) {
      return;
    }

    await trigger({
      topicId,
      body: {
        data: [
          {
            type: 'topic',
            attributes: {
              addedWordIds: changesRef.current.addedWordIds,
              removedWordIds: changesRef.current.removedWordIds,
              description: topicDescription,
              emoji: '📚',
              name: topicName,
              wordList: wordIds,
            },
          },
        ],
      },
    });

    await mutate(/topics/);

    toast.success({
      msg: 'Successfully updated topic',
      title: 'Success',
    });

    navigate('/admin/topics');
  }
  return (
    <div>
      {isLoadingTopic && (
        <FillParent>
          <Loading />
        </FillParent>
      )}

      {!isLoadingTopic && !topic && (
        <FillParent>
          <ApplicationError
            errorTitle="Topic not found"
            errorDescription="The topic you are looking for does not exist."
          />
        </FillParent>
      )}

      {!isLoadingTopic && topic && (
        <>
          <Input
            value={topicName}
            onChange={e => setTopicName(e.target.value)}
            placeholder="Enter topic name"
            className="mb-2 border-none p-0 text-3xl uppercase focus-visible:ring-0"
          />
          <Input
            value={topicDescription}
            onChange={e => setTopicDescription(e.target.value)}
            placeholder="What is this topic about?"
            className="mb-8 border-none p-0 text-xl uppercase focus-visible:ring-0"
          />

          <AddWordManuallyForm
            canSubmit={!!topicName && !!topicDescription}
            onSubmit={handleUpdateTopic}
            isLoading={isMutating}
            onAdd={handleSelectValue}
            onRemove={handleRemoveValue}
            selectedWord={selectedValue}
          />
        </>
      )}
    </div>
  );
}
