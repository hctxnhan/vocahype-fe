import { useId } from 'react';

import { cn } from '@/lib/utils/utils';

export interface SettingRadioOptionProps {
  value: string;
  subtitle?: string;
  description: string;
  label: string;
  currentValue: string;
  onChange: (value: string) => void;
}

export function SettingRadioOption({
  value,
  currentValue,
  label,
  subtitle,
  description,
  onChange,
}: SettingRadioOptionProps) {
  const id = useId();
  const selected = currentValue === value;

  return (
    <div className="">
      <label
        htmlFor={id}
        className={cn(
          'vh-flex-column h-full cursor-pointer rounded-md border-2 bg-background p-3 transition-colors hover:bg-background/90',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': selected,
          }
        )}
      >
        <span className="font-medium uppercase">{label}</span>
        {subtitle && <span className="text-sm font-medium">{subtitle}</span>}
        <span
          className={cn('mt-2 text-sm text-muted-foreground', {
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
