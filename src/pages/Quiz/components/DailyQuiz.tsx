import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils/utils';
import { useState } from 'react';
import { QuizItem } from './QuizItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function DailyQuiz({ questions }: { questions: any[] }) {
  const [selectedIndex, setSelectedIndex] = useState<string>('0');
  const [result, setResult] = useState<boolean[]>([]);

  function onChoose(index: number, correct: boolean) {
    const newResult = [...result];
    newResult[index] = correct;
    setResult(newResult);
  }

  return (
    <div className="max-w-full">
      <DndProvider backend={HTML5Backend}>
        <Tabs value={selectedIndex} onValueChange={setSelectedIndex}>
          <TabsList className="gap-4 bg-transparent">
            {questions.map((_, index) => (
              <TabsTrigger
                className={cn('rounded-full bg-muted', {
                  'border border-primary text-primary':
                    selectedIndex === index.toString(),
                  'bg-green-500 text-green-50': result[index],
                  'bg-red-500 text-red-50': !result[index] && result[index] !== undefined,
                })}
                key={index}
                value={index.toString()}
              >
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 rounded-md border">
            {questions.map((question, index) => (
              <div
                key={index}
                className={cn({
                  hidden:
                    selectedIndex !== questions.indexOf(question).toString(),
                })}
              >
                <QuizItem
                  onChoose={(correct: boolean) => onChoose(index, correct)}
                  quiz={question}
                />
              </div>
            ))}
          </div>
        </Tabs>
      </DndProvider>
    </div>
  );
}
