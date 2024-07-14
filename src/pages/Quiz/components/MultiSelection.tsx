import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { QuizCompProps, SelectionQuiz } from './type';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

const question = {
  type: 'definition_multiple_select',
  question: 'Select all the definitions that match the word.',
  word: 'bar',
  result: [
    {
      text: 'the body of individuals qualified to practice law in a particular jurisdiction',
      correct: true,
    },
    {
      text: 'prevent from entering; keep out',
      correct: true,
    },
    {
      text: 'a portable .30 caliber automatic rifle operated by gas pressure and fed by cartridges from a magazine; used by United States troops in World War I and in World War II and in the Korean War',
      correct: true,
    },
    {
      text: 'render unsuitable for passage',
      correct: true,
    },
    {
      text: 'musical notation for a repeating pattern of musical beats',
      correct: true,
    },
    {
      text: 'expel, as if by official decree',
      correct: true,
    },
    {
      text: 'a block of solid substance (such as soap or wax)',
      correct: true,
    },
    {
      text: 'the act of preventing',
      correct: true,
    },
  ],
};

export function MultiSelection({
  question,
  onChoose,
}: QuizCompProps<SelectionQuiz>) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const canSubmit = selectedAnswers.length > 0;

  const handleSelection = (index: number) => {
    if (selectedAnswers?.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter(answer => answer !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  function handleSubmit() {
    if (selectedAnswers.length === 0) return;

    const correct = selectedAnswers.every(
      index => question.result[index].correct
    );

    setShowResult(true);

    onChoose(correct);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {question.result.map((answer, index) => (
          <div
            key={index}
            className={cn(
              `group m-1 flex cursor-pointer items-center space-x-2 rounded-lg py-1 px-2 ring-2 ring-muted ring-offset-2 transition-all hover:bg-primary hover:text-primary-foreground`,
              {
                'bg-primary text-primary-foreground':
                  selectedAnswers?.includes(index),
                'bg-green-500 text-green-50': showResult && answer.correct,
                'bg-red-500 text-red-50': showResult && !answer.correct && selectedAnswers?.includes(index),
              }
            )}
            onClick={() => handleSelection(index)}
          >
            <Checkbox
              disabled={showResult}
              id={`option-${index}`}
              checked={selectedAnswers?.includes(index)}
            />
            <Label
              htmlFor={`option-${index}`}
              className="pointer-events-none text-base font-normal"
            >
              {answer.text}
            </Label>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || showResult}
        className="mt-6 w-full"
      >
        Submit
      </Button>
    </div>
  );
}
