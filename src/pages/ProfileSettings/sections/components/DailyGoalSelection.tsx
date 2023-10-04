import { DailyGoalOption, DailyGoalOptionProps } from "./DailyGoalOption";

export function DailyGoalSelection({
  value,
  onChange,
  options
}: {
  value: number;
  onChange: (value: number) => void;
  options: Omit<DailyGoalOptionProps, "currentValue" | "onChange">[];
}) {
  return (
    <div className="grid grid-cols-6 gap-4 grid-flow-row">
      {options.map((option) => (
        <DailyGoalOption
          key={option.value}
          currentValue={value}
          {...option}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
