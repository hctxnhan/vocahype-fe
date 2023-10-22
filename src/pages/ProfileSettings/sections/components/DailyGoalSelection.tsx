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
    <div className="grid grid-flow-row grid-cols-3 gap-4 max-md:grid-cols-2">
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
