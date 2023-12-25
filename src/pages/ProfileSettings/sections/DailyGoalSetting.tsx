import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { postDailyGoal } from '@/api/profile/learningTime';
import { getUserprofile } from '@/api/profile/profile';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { DAILY_GOAL_LEVEL } from '@/lib/enums/settings';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { goalSettingOptions } from '@/lib/utils/constant';

import { SettingRadioGroup } from './components/SettingRadioGroup';

export function DailyGoalSetting() {
  const [currentValue, setCurrentValue] = useState('');
  const { mutate } = useSWRConfig()

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
        void mutate('profile')
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

  const profile = data?.data?.[0];

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
      <h3 id="set" className="mb-4 text-xl font-medium uppercase">
        Learning
      </h3>
      <div className="flex gap-10 max-md:flex-col max-md:gap-4">
        <div className="vh-flex-column w-44 max-md:w-full">
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
          <SettingRadioGroup
            options={goalSettingOptions}
            onChange={handleChangeGoal}
            value={currentValue}
          />
        </div>
      </div>
    </div>
  );
}
