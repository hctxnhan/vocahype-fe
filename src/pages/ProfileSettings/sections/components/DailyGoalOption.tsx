import { useId } from 'react';

import { cn } from '@/lib/utils/utils';

export interface DailyGoalOptionProps {
  value: number;
  time: number;
  description: string;
  label: string;
  currentValue: number;
  onChange: (value: number) => void;
}

export function DailyGoalOption({
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
          'vh-flex-column h-full cursor-pointer rounded-md bg-white p-3 transition-colors hover:bg-slate-200 border-2',
          {
            'bg-brand-600 text-white hover:bg-brand-700': selected,
          }
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="text-sm font-medium">{time} mins per day</span>
        <span
          className={cn('text-sm text-slate-500 mt-2', {
            'text-slate-200': selected,
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
