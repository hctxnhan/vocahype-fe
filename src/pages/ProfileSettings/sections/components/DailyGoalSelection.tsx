import { DailyGoalOption, DailyGoalOptionProps } from './DailyGoalOption';

export function DailyGoalSelection({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Omit<DailyGoalOptionProps, 'currentValue' | 'onChange'>[];
}) {
  const handleOnChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="grid grid-flow-row gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {options.map(option => (
        <DailyGoalOption
          key={option.value}
          currentValue={value}
          {...option}
          onChange={handleOnChange}
        />
      ))}
    </div>
  );
}
