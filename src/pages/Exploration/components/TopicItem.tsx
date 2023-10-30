import { Progress } from '@/components/ui/progress';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { cn } from '@/lib/utils/utils';

interface TopicItemProps {
  topicName: string;
  topicDescription: string;
  topicHref: string;
  topicTotalWords: number;
  topicCurrentWords: number;
}

export function TopicItem({
  topicCurrentWords,
  topicDescription,
  topicName,
  topicTotalWords,
}: TopicItemProps) {
  const progress = (topicCurrentWords / topicTotalWords) * 100;
  return (
    <div
      data-tour={TOUR_STEPS.EXPLORATION.TOPIC}
      className={cn(
        'vh-flex-column h-full cursor-pointer space-y-2 rounded-md border-2 bg-muted/70 p-3 transition-colors hover:bg-primary hover:text-primary-foreground'
      )}
    >
      <span className="font-medium uppercase">{topicName}</span>
      <span className={cn('flex-1 text-sm')}>{topicDescription}</span>
      <div
        className="center gap-2"
        data-tour={TOUR_STEPS.EXPLORATION.PROGRESSION}
      >
        <Progress value={progress} />
        <p className="shrink-0 text-sm">
          {topicCurrentWords} / {topicTotalWords}
        </p>
      </div>
    </div>
  );
}
