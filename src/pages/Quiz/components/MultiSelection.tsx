import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const question = {
  type: 'definition_select',
  question: 'Select all the definitions that match the word.',
  word: 'capability',
  answers: [
    {
      text: 'the quality of being capable',
      correct: true,
    },
    {
      text: 'the quality of being able to perform',
      correct: true,
    },
    {
      text: 'deo ai ma biet duoc',
      correct: false,
    },
  ],
};

export function MultiSelection() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleSelection = (index: number) => {
    if (selectedAnswers?.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter(answer => answer !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {question.answers.map((answer, index) => (
        <div
          key={index}
          className={`group flex cursor-pointer items-center space-x-2 rounded-lg p-3 ring-2 ring-muted ring-offset-2 transition-all hover:bg-primary hover:text-primary-foreground ${
            selectedAnswers?.includes(index)
              ? 'bg-primary text-primary-foreground'
              : ''
          }`}
          onClick={() => handleSelection(index)}
        >
          <Checkbox
            id={`option-${index}`}
            checked={selectedAnswers?.includes(index)}
          />
          <Label htmlFor={`option-${index}`} className="text-base font-normal pointer-events-none">
            {answer.text}
          </Label>
        </div>
      ))}
    </div>
  );
}
