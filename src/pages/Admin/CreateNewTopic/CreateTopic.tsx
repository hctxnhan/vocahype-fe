import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useLocation } from 'wouter';

import { createTopic } from '@/api/words/manageTopic';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMatchMutate } from '@/lib/hooks/useMatchMutate';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { useToast } from '@/lib/hooks/useToast';

import { AddWordManuallyForm } from './AddWordManuallyForm';
import { UploadSrtSubtitle } from './UploadSrtSubtitle';

export function CreateTopic() {
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const handleSelectValue = (value: string) => {
    setSelectedValue([...selectedValue, value]);
  };

  const handleRemoveValue = (value: string) => {
    setSelectedValue(selectedValue.filter(v => v.toLowerCase() !== value.toLowerCase()));
  };

  const mutate = useMatchMutate();
  useSetBreadcrumb([
    {
      label: 'Admin',
      href: '/admin',
    },
    'Create Topic',
  ]);

  const toast = useToast();
  const [, navigate] = useLocation();

  const { isMutating, trigger } = useSWRMutation(
    ['create-new-word'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - fix this
    createTopic
  );

  async function handleCreateTopic(words: string[], file?: File) {
    if (!topicName || !topicDescription || (!words.length && !file)) {
      return;
    }

    await trigger({
      body: {
        data: [
          {
            type: 'topic',
            attributes: {
              description: topicDescription,
              emoji: '📚',
              name: topicName,
              wordList: words,
            },
          },
        ],
      },
      file,
    });

    await mutate(/topics/);

    toast.success({
      msg: 'Successfully created topic',
      title: 'Success',
    });

    navigate('/admin/topics');
  }

  return (
    <div className="w-full">
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
      <Tabs defaultValue="manually">
        <TabsList className="mb-2">
          <TabsTrigger value="manually">Add word manually</TabsTrigger>
          <TabsTrigger value="subtitle">From .srt subtitle</TabsTrigger>
        </TabsList>
        <TabsContent value="manually">
          <AddWordManuallyForm
            selectedWord={selectedValue}
            onAdd={handleSelectValue}
            onRemove={handleRemoveValue}
            canSubmit={!!topicName && !!topicDescription}
            onSubmit={handleCreateTopic}
            isLoading={isMutating}
          />
        </TabsContent>
        <TabsContent value="subtitle">
          <UploadSrtSubtitle
            canSubmit={!!topicName && !!topicDescription}
            onSubmit={(file) =>  handleCreateTopic([], file)}
            isLoading={isMutating}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
