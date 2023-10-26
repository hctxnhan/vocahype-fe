import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getUserprofile, postDailyGoal } from '@/api/words/profile';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { DAILY_GOAL_LEVEL } from '@/lib/enums/level';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { DailyGoalSelection } from './components/DailyGoalSelection';

const goalSettingOptions = [
  {
    id: 0,
    value: DAILY_GOAL_LEVEL.BASIC,
    label: 'BASIC 💤',
    time: 5,
    description:
      'The Basic setting is perfect for beginners or individuals with limited time to spare.',
  },
  {
    id: 1,
    value: DAILY_GOAL_LEVEL.CASUAL,
    label: 'CASUAL 💗',
    time: 10,
    description:
      'The Casual setting is designed for learners who prefer a relaxed pace but still want to make consistent progress.',
  },
  {
    id: 2,
    value: DAILY_GOAL_LEVEL.REGULAR,
    label: 'REGULAR 💦',
    time: 15,
    description:
      'The Regular setting is suitable for learners looking for a balanced approach to English language learning.',
  },
  {
    id: 3,
    value: DAILY_GOAL_LEVEL.SERIOUS,
    label: 'SERIOUS 🔥',
    time: 20,
    description:
      'The Serious setting is ideal for learners committed to making substantial progress in a shorter time frame.',
  },
  {
    id: 4,
    value: DAILY_GOAL_LEVEL.CHALLENGE,
    label: 'CHALLENGE 💢',
    time: 25,
    description:
      'The Challenge setting is designed for learners seeking a more intensive learning experience.',
  },
  {
    id: 5,
    value: DAILY_GOAL_LEVEL.HARDCORE,
    label: 'EXTREME 🌊',
    time: 30,
    description:
      'The Hardcore setting is for highly motivated learners who are ready to immerse themselves fully in English language learning.',
  },
];

export function DailyGoalSetting() {
  const [currentValue, setCurrentValue] = useState('');

  const { data, isLoading: isFetchingProfile } = useSWR(
    'profile',
    getUserprofile
  );

  const toast = useToast();
  const { start, isLoading: isSettingGoal } = useAsyncAction(postDailyGoal);

  function handleUpdateDailyGoal(level: DAILY_GOAL_LEVEL) {
    start([level], {
      onSuccess: () => {
        toast.success({ title: 'Updated daily goal successfully' });
      },
      onError: () => {
        toast.error({ title: 'Daily goal update failed' });
      },
    });
  }

  function handleChangeGoal(value: string) {
    setCurrentValue(value);
    handleUpdateDailyGoal(value as DAILY_GOAL_LEVEL);
  }

  const profile = data?.data?.[0]?.attributes;
  const isLoading = isFetchingProfile || isSettingGoal;

  useEffect(() => {
    if (!isLoading && profile) {
      const dailyGoal =
        goalSettingOptions.find(item => item.time * 60 === profile?.goalSeconds)
          ?.value || '';

      setCurrentValue(dailyGoal);
    }
  }, [profile?.goalSeconds]);

  return (
    <div>
      <h3 className="mb-4 text-xl font-medium uppercase">Learning</h3>
      <div className="flex gap-10 max-md:flex-col max-md:gap-4">
        <div className="vh-flex-column w-32 max-md:w-full">
          <label className="font-medium" htmlFor="">
            Daily goal
          </label>
          <dl className="text-sm text-foreground/70">
            Embrace consistent progress in English learning by dedicating
            focused time each day in the app.
          </dl>
        </div>
        <div className="flex-1">
          {isLoading && (
            <FillParent className="fixed z-[9999] bg-secondary/90">
              <Loading />
            </FillParent>
          )}
          <DailyGoalSelection
            options={goalSettingOptions}
            onChange={handleChangeGoal}
            value={currentValue}
          />
        </div>
      </div>
    </div>
  );
}
