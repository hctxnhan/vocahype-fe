import { useId } from 'react';

import { cn } from '@/lib/utils/utils';

export interface DailyGoalOptionProps {
  value: string;
  time: number;
  description: string;
  label: string;
  currentValue: string;
  onChange: (value: string) => void;
}

export function DailyGoalOption ({
  value,
  currentValue,
  label,
  time,
  description,
  onChange,
}: DailyGoalOptionProps) {
  const id = useId();
  const selected = currentValue === value;

  return (
    <div className="">
      <label
        htmlFor={id}
        className={cn(
          'vh-flex-column h-full cursor-pointer rounded-md bg-background p-3 transition-colors hover:bg-background/90 border-2',
          {
            'bg-primary hover:bg-primary/90 text-primary-foreground': selected,
          }
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="text-sm font-medium">{time} mins per day</span>
        <span
          className={cn('text-sm text-muted-foreground mt-2', {
            'text-primary-foreground': selected,
          })}
        >
          {description}
        </span>
      </label>
      <input
        checked={selected}
        onChange={() => onChange(value)}
        className="sr-only"
        id={id}
        type="radio"
        value={value}
        name="daily-goal"
      />
    </div>
  );
}
