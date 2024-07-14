import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuizCompProps, SelectionQuiz } from './type';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

export function Selection({
  question,
  onChoose,
}: QuizCompProps<SelectionQuiz>) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  function handleSelection(index: number) {
    setSelectedAnswer(index);
  }

  const canSubmit = selectedAnswer !== null;

  function handleSubmit() {
    if (selectedAnswer === null) return;

    const correct = question.result[selectedAnswer!].correct;

    setShowResult(true);
    onChoose(correct);
  }

  return (
    <>
      <RadioGroup
        disabled={showResult}
        value={selectedAnswer?.toString()}
        onValueChange={value => {
          setSelectedAnswer(Number(value));
        }}
      >
        {question.result.map((answer, index) => (
          <div
            onClick={() => handleSelection(index)}
            key={index}
            className={cn(
              `group m-1 flex cursor-pointer items-center space-x-2 rounded-lg py-1 px-2 ring-2 ring-muted ring-offset-2 transition-all hover:bg-primary hover:text-primary-foreground`,
              {
                'bg-primary text-primary-foreground': selectedAnswer === index,
                'bg-green-500 text-green-50': showResult && answer.correct,
                'bg-red-500 text-red-50': showResult && !answer.correct && selectedAnswer === index,
              }
            )}
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
        disabled={!canSubmit || showResult}
        className="mt-6 w-full"
      >
        Submit
      </Button>
    </>
  );
}
