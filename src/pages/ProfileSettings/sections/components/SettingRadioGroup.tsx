import { SettingRadioOption, SettingRadioOptionProps } from './SettingRadioOption';

export function SettingRadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Omit<SettingRadioOptionProps, 'currentValue' | 'onChange'>[];
}) {

  return (
    <div className="grid grid-flow-row gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {options.map(option => (
        <SettingRadioOption
          key={option.value}
          currentValue={value}
          {...option}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
