import { useEffect, useState } from 'react';

import {
  getGeneratedStory,
  getLearnedWords,
} from '@/api/words/getGeneratedStory';
import { Loading } from '@/components/layout/Loading/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoadingButton } from '@/components/ui/loading-button';
import { Slider } from '@/components/ui/slider';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDailyQuiz } from '@/api/words/getQuiz';
import { DailyQuiz } from '../Quiz/components/DailyQuiz';

export function GenerateStory() {
  const [currentValue, setCurrentValue] = useState([7]);
  const debouncedDay = useDebounce(currentValue[0], 500);
  const learnedWord = useAsyncAction(getLearnedWords);

  useEffect(() => {
    if (debouncedDay) {
      learnedWord.start([debouncedDay]);
    }
  }, [debouncedDay, learnedWord.start]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <p className="mr-1.5">Review</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80vh] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review</DialogTitle>
          <DialogDescription>
            This is a review section where you can review the words you have
            learned
          </DialogDescription>
        </DialogHeader>

        <Slider
          inverted
          defaultValue={[7]}
          onValueChange={setCurrentValue}
          value={currentValue}
          max={100}
          min={3}
          step={1}
        />
        <p className="text-sm">past {currentValue} days</p>
        <div className="rounded-sm border p-5">
          {learnedWord.isLoading && (
            <Loading fontStyle="font-body" loadingText={``} />
          )}
          {!learnedWord.isLoading && learnedWord.data?.data?.length === 0 && (
            <p className="text-center text-sm text-destructive">
              You did not learn any words in the past {debouncedDay} days
            </p>
          )}
          {!learnedWord.isLoading && (
            <p className="text-sm italic">
              {learnedWord.data?.data?.join?.(', ')}
            </p>
          )}
        </div>

        <Tabs defaultValue="quiz">
          <TabsList className="mb-2">
            <TabsTrigger value="quiz">Review quiz</TabsTrigger>
            <TabsTrigger value="story">Generate story (AI)</TabsTrigger>
          </TabsList>
          <TabsContent value="story">
            <Story
              numOfWords={learnedWord.data?.data?.length || 0}
              isLoading={learnedWord.isLoading}
              numOfDate={currentValue[0]}
            />
          </TabsContent>
          <TabsContent value="quiz">
            <ReviewTest
              numOfDate={currentValue[0]}
              isLoading={learnedWord.isLoading}
              numOfWords={learnedWord.data?.data?.length || 0}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function Story({
  isLoading,
  numOfDate,
  numOfWords,
}: {
  isLoading: boolean;
  numOfWords: number;
  numOfDate: number;
}) {
  const generatedStory = useAsyncAction(getGeneratedStory);

  return (
    <>
      <div className="flex gap-2">
        <p>{generatedStory.data?.story}</p>
      </div>

      {!isLoading && (
        <LoadingButton
          disabled={generatedStory.isLoading || numOfWords === 0}
          isLoading={generatedStory.isLoading}
          onClick={() => generatedStory.start([numOfDate])}
          className="mt-2 w-full"
        >
          {generatedStory.data?.story ? 'Re-generate' : 'Generate'}
        </LoadingButton>
      )}
    </>
  );
}

function ReviewTest({
  numOfDate,
  numOfWords,
  isLoading,
}: {
  numOfDate: number;
  numOfWords: number;
  isLoading: boolean;
}) {
  const quiz = useAsyncAction(getDailyQuiz);

  if (quiz.isLoading) {
    return <Loading fontStyle="font-body" loadingText="Loading quiz..." />;
  }

  return (
    <div>
      {quiz.data?.data && <DailyQuiz questions={quiz.data.data} />}
      {!isLoading && (
        <LoadingButton
          isLoading={isLoading}
          disabled={quiz.isLoading || numOfWords === 0}
          onClick={() => quiz.start([numOfDate])}
          className="mt-2 w-full"
        >
          {quiz.data ? 'Re-generate' : 'Generate'}
        </LoadingButton>
      )}
    </div>
  );
}
