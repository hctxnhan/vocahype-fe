import { ReactNode, useEffect } from 'react';
import { useSWRConfig } from 'swr';

import { postTrackLearningTime } from '@/api/profile/learningTime';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/lib/utils/localStorage';

const ONE_MINUTE_IN_SECONDS = 60;

export function TrackLearningTime({ children }: { children: ReactNode }) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getLocalStorageItem('learningTime');
      const newTime = Number(time) + ONE_MINUTE_IN_SECONDS;
      setLocalStorageItem('learningTime', newTime);
    }, ONE_MINUTE_IN_SECONDS * 1000);

    async function updateLearningTime(time: number) {
      await postTrackLearningTime(time);
      await mutate('learning-time');
    }

    return () => {
      const time = getLocalStorageItem('learningTime');
      const timeInNumber = time ? Number(time) : 0;
      if (timeInNumber > 0) void updateLearningTime(timeInNumber);
      removeLocalStorageItem('learningTime');
      clearInterval(interval);
    };
  }, []);

  return children;
}
