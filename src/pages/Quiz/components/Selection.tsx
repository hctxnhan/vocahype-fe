import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuizCompProps, SelectionQuiz } from './type';
import { Button } from '@/components/ui/button';

export function Selection({
  question,
  onChoose,
}: QuizCompProps<SelectionQuiz>) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  function handleSelection(index: number) {
    setSelectedAnswer(index);
  }

  const canSubmit = selectedAnswer !== null;

  function handleSubmit() {
    if (selectedAnswer === null) return;

    const correct = question.result[selectedAnswer!].correct;
    onChoose(correct);
  }

  return (
    <>
      <RadioGroup
        value={selectedAnswer?.toString()}
        onValueChange={value => {
          setSelectedAnswer(Number(value));
        }}
      >
        {question.result.map((answer, index) => (
          <div
            onClick={() => handleSelection(index)}
            key={index}
            className={`m-1 group flex cursor-pointer items-center space-x-2 rounded-lg p-3 ring-2 ring-muted ring-offset-2 transition-all hover:bg-primary hover:text-primary-foreground ${
              selectedAnswer === index
                ? 'bg-primary text-primary-foreground'
                : ''
            }`}
          >
            <RadioGroupItem
              className={`w-0 border-transparent`}
              id={`option-${index}`}
              value={index.toString()}
            />
            <Label
              htmlFor={`option-${index}`}
              className="pointer-events-none text-base font-normal"
            >
              {answer.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="mt-6 w-full"
      >
        Submit
      </Button>
    </>
  );
}
