import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { postTargetTopic } from '@/api/profile/learningTopic';
import { getUserprofile } from '@/api/profile/profile';
import { getTopicsList } from '@/api/words/topics';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { SettingRadioGroup } from './components/SettingRadioGroup';

export function TopicSetting() {
  const [currentValue, setCurrentValue] = useState('');

  const { data: profile, isLoading: isFetchingProfile } = useSWR(
    'profile',
    getUserprofile
  );
  const { data: topicsList, isLoading: isFetchingTopics } = useSWR(
    '/topics',
    getTopicsList
  );

  const toast = useToast();
  const { start, isLoading: isSettingTopic } = useAsyncAction(postTargetTopic);

  const topics =
    topicsList?.data
      ?.filter(item => item.wordCount > 10)
      .sort((a, b) => b.wordCount - a.wordCount)
      .map(item => ({
        label: `${item?.name}${item.emoji ? ` ${item.emoji}` : ''}`,
        value: item.id.toString(),
        description: item.description,
      })) ?? [];

  useEffect(() => {
    if (profile?.data.length) {
      setCurrentValue(profile?.data[0].topic?.id.toString() ?? '');
    }

    return () => {
      setCurrentValue('');
    };
  }, [profile]);

  function handleUpdateDailyGoal(level: string) {
    start([level], {
      onSuccess: () => {
        toast.success({ title: 'Updated daily goal successfully' });
        setCurrentValue(level);
      },
      onError: () => {
        toast.error({ title: 'Daily goal update failed' });
      },
    });
  }

  const isLoading = isFetchingProfile || isSettingTopic || isFetchingTopics;

  return (
    <div className="flex gap-10 max-md:flex-col max-md:gap-4">
      <div className="vh-flex-column w-44 max-md:w-full">
        <label className="font-medium" htmlFor="">
          Main topic
        </label>
        <dl className="text-sm text-foreground/70">
          Focus on a specific topic to learn words from will help you reach your
          goal faster. We will prioritize words from your selected topic but you
          will still learn words from other topics.
        </dl>
      </div>
      <div className="flex-1">
        {isLoading && (
          <FillParent className="fixed z-[9999] bg-secondary/90">
            <Loading />
          </FillParent>
        )}
        {!isLoading && (
          <SettingRadioGroup
            disabled={isLoading}
            options={topics}
            onChange={handleUpdateDailyGoal}
            value={currentValue}
          />
        )}
      </div>
    </div>
  );
}
