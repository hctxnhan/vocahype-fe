import { useState } from 'react';

import { DailyGoalSelection } from './components/DailyGoalSelection';

const goalSettingOptions = [
  {
    value: 0,
    label: 'BASIC 💤',
    time: 5,
    description:
      'The Basic setting is perfect for beginners or individuals with limited time to spare.',
  },
  {
    value: 1,
    label: 'CASUAL 💗',
    time: 10,
    description:
      'The Casual setting is designed for learners who prefer a relaxed pace but still want to make consistent progress.',
  },
  {
    value: 2,
    label: 'REGULAR 💦',
    time: 15,
    description:
      'The Regular setting is suitable for learners looking for a balanced approach to English language learning.',
  },
  {
    value: 3,
    label: 'SERIOUS 🔥',
    time: 20,
    description:
      'The Serious setting is ideal for learners committed to making substantial progress in a shorter time frame.',
  },
  {
    value: 4,
    label: 'CHALLENGE 💢',
    time: 25,
    description:
      'The Challenge setting is designed for learners seeking a more intensive learning experience.',
  },
  {
    value: 5,
    label: 'EXTREME 🌊',
    time: 30,
    description:
      'The Hardcore setting is for highly motivated learners who are ready to immerse themselves fully in English language learning.',
  },
];

export function DailyGoalSetting() {
  const [currentValue, setCurrentValue] = useState(0);
  return (
    <div>
      <h3 className="text-xl font-medium uppercase mb-4">Learning</h3>
      <div className="flex gap-10">
        <div className="vh-flex-column w-32">
          <label className="font-medium" htmlFor="">
            Daily goal
          </label>
          <dl className="text-slate-500 text-sm">
            Embrace consistent progress in English learning by dedicating
            focused time each day in the app.
          </dl>
        </div>
        <div className='flex-1'>
          <DailyGoalSelection
            options={goalSettingOptions}
            onChange={setCurrentValue}
            value={currentValue}
          />
        </div>
      </div>
    </div>
  );
}
