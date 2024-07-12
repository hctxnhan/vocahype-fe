import { useRef, useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const question = {
  title: 'What is the capital of France?',
  description: 'Select the correct answer.',
  options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
  correctAnswer: 0,
};

export function Selection() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  function handleSelection(index: number) {
    setSelectedAnswer(index);
  }

  return (
    <RadioGroup
      value={selectedAnswer?.toString()}
      onValueChange={value => {
        setSelectedAnswer(Number(value));
      }}
    >
      {question.options.map((answer, index) => (
        <div
          onClick={() => handleSelection(index)}
          key={index}
          className={`group flex cursor-pointer items-center space-x-2 rounded-lg p-3 ring-2 ring-muted ring-offset-2 transition-all hover:bg-primary hover:text-primary-foreground ${
            selectedAnswer === index ? 'bg-primary text-primary-foreground' : ''
          }`}
        >
          <RadioGroupItem
            className={`border-transparent`}
            id={`option-${index}`}
            value={index.toString()}
          />
          <Label htmlFor={`option-${index}`} className="text-base font-normal pointer-events-none">
            {answer}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
