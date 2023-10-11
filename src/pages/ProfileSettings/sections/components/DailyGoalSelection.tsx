import { postDailyGoal } from "@/api/words/profile";
import { DAILY_GOAL_LEVEL } from "@/lib/enums/level";
import { useAsyncAction } from "@/lib/hooks/useAsyncAction";
import { useToast } from "@/lib/hooks/useToast";

import { DailyGoalOption, DailyGoalOptionProps } from "./DailyGoalOption";

export function DailyGoalSelection ({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (value: string) => void;
  options: Omit<DailyGoalOptionProps, "currentValue" | "onChange">[];
}) {

  const toast = useToast();
  const { start } = useAsyncAction(postDailyGoal);
  const handleUpdateDailyGoal =
    (level: DAILY_GOAL_LEVEL) => {
      start([level], {
        onSuccess: () => {
          toast.success({ title: 'Updated daily goal successfully' });
        },
        onError: () => {
          toast.error({ title: 'Daily goal update failed' });
        },
      });
    };

  const handleOnChange = (value: string) => {
    handleUpdateDailyGoal(value as DAILY_GOAL_LEVEL)
    onChange(value)
  }

  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row">
      {options.map((option) => (
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
