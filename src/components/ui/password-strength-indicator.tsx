import { Progress } from '@/components/ui/progress';
import { regexElementSatisfied } from '@/lib/utils/regex';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const currentStrength = regexElementSatisfied(password);
  const currentStrengthPercent = (currentStrength / 5) * 100;
  return (
    <Progress
      value={currentStrengthPercent}
      className="rounded-md h-[8px] border border-slate-200/40 bg-slate-200/30"
    />
  );
}
