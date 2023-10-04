import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { ProfileInfo } from '../ProfileInfo';

import { DailyGoalSetting } from './DailyGoalSetting';

export function ProfileSettings() {
  useSetBreadcrumb(['Profile Settings']);
  return (
    <div className="vh-flex-column gap-8 rounded-md bg-slate-100/50 p-8">
      <ProfileInfo />
      <DailyGoalSetting />
    </div>
  );
}
