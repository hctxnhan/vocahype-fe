import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { QuizCompProps, WordGuessQuiz } from './type';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/utils';

export function WordGuess({ question, onChoose }: QuizCompProps<WordGuessQuiz>) {
  const [answer, setAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const canSubmit = answer.trim() !== '';

  function handleSubmit() {
    if (!canSubmit) return;

    const correct = question.word === answer.trim();

    setShowResult(true);
    onChoose(correct);
  }

  return (
    <>
      <p className="mb-4">{question.description}</p>
      <Input
        value={answer}
        disabled={showResult}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Your answer"
      />
      {showResult && (
        <p
          className={cn('mt-2', {
            'text-green-500': question.word === answer.trim(),
            'text-red-500': question.word !== answer.trim(),
          })}
        >
          {question.word === answer.trim()
            ? 'Correct!'
            : `Incorrect. The answer is ${question.word}`}
        </p>
      )}
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
