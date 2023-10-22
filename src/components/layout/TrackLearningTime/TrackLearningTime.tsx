import { ReactNode, useEffect } from 'react';

import { postTrackLearningTime } from '@/api/words/profile';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/lib/utils/localStorage';

const ONE_MINUTE_IN_SECONDS = 60;

export function TrackLearningTime({ children }: { children: ReactNode }) {
  useEffect(() => {
    const interval = setInterval(() => {
      const time = getLocalStorageItem('learningTime');
      const newTime = Number(time) + ONE_MINUTE_IN_SECONDS;
      setLocalStorageItem('learningTime', newTime);
    }, ONE_MINUTE_IN_SECONDS * 1000);

    return () => {
      const time = getLocalStorageItem('learningTime');
      const timeInNumber = time ? Number(time) : 0;
      if (timeInNumber > 0) void postTrackLearningTime(timeInNumber);
      removeLocalStorageItem('learningTime');
      clearInterval(interval);
    };
  }, []);
  return children;
}
