import {
  SettingRadioOption,
  SettingRadioOptionProps,
} from './SettingRadioOption';

export function SettingRadioGroup({
  value,
  onChange,
  options,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Omit<SettingRadioOptionProps, 'currentValue' | 'onChange'>[];
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {options.map(option => (
        <SettingRadioOption
          disabled={disabled}
          key={option.value}
          currentValue={value}
          {...option}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
