import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { DailyGoalSetting } from './sections/DailyGoalSetting';
import { ProfileInfo } from './sections/ProfileInfo';
import { ResetLearningProgression } from './sections/ResetLearningProgression';
import { TopicSetting } from './sections/TopicSetting';

export function ProfileSettings() {
  useSetBreadcrumb(['Profile Settings']);
  return (
    <div className="vh-flex-column gap-8 rounded-md bg-muted p-8">
      <ProfileInfo />
      <DailyGoalSetting />
      <TopicSetting />
      <ResetLearningProgression />
    </div>
  );
}
