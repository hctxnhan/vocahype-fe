import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuizAnswer } from '@/lib/interfaces/type';

interface QuizItemProps {
  question: string;
  answers: string[];
  onChoose: (answer: QuizAnswer) => void;
}

export function QuizItem({ question, answers, onChoose }: QuizItemProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer>(
    '' as QuizAnswer
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer}
          onValueChange={value => {
            setSelectedAnswer(value as QuizAnswer);
          }}
        >
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                id={`option-${index}`}
                value={String.fromCharCode(65 + index)}
              />
              <Label htmlFor={`option-${index}`}>{answer}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            onChoose(selectedAnswer);
          }}
          disabled={!selectedAnswer}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
