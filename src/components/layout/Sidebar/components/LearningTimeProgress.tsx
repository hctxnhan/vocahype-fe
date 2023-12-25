import useSWR from 'swr';
import { Link } from 'wouter';

import { getTrackLearningTime } from '@/api/profile/learningTime';
import { getUserprofile } from '@/api/profile/profile';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn, secondToFloorMinute } from '@/lib/utils/utils';

type LearningTimeProgressProps = React.HTMLAttributes<HTMLDivElement>;

export function LearningTimeProgress({
  className,
  ...rest
}: LearningTimeProgressProps) {
  const {
    data: learningTime,
    isLoading: isLoadingLearningTime,
    error: errorGetLearningTime,
  } = useSWR('learning-time', getTrackLearningTime);
  const { data: userProfile } = useSWR('profile', getUserprofile);

  if (isLoadingLearningTime || errorGetLearningTime) return null;

  const currentLearningTime = learningTime?.data[0].userLearntTime ?? 0;
  const dailyGoal = userProfile?.data[0].goalSeconds;

  if (!dailyGoal)
    return (
      <p className="text-sm">
        You haven't set your daily goal yet.{' '}
        <Link href="/profile">
          <Button variant="link">Set daily goal</Button>
        </Link>
      </p>
    );

  const percentage = Math.min((currentLearningTime / dailyGoal) * 100, 100);

  return (
    <div className={cn('space-y-2', className)} {...rest}>
      <p className="text-sm">
        {`You've learnt ${secondToFloorMinute(
          currentLearningTime
        )} / ${secondToFloorMinute(dailyGoal)} minutes today`}
      </p>
      <Progress value={percentage} />
    </div>
  );
}
