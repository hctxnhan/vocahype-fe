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

export function GenerateStory() {
  const [currentValue, setCurrentValue] = useState([7]);
  const debouncedDay = useDebounce(currentValue[0], 500);
  const learnedWord = useAsyncAction(getLearnedWords);
  const generatedStory = useAsyncAction(getGeneratedStory);

  useEffect(() => {
    if (debouncedDay) {
      learnedWord.start([debouncedDay]);
    }
  }, [debouncedDay, learnedWord.start]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <p className="mr-1.5">Generate story</p>
          <Badge variant={'outline'}>AI</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate AI story</DialogTitle>
          <DialogDescription>
            This will generate a story based on the words that you have learned
            in the past.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
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
        </div>
        <div className="rounded-sm border p-5">
          {learnedWord.isLoading && (
            <Loading
              fontStyle="font-body"
              loadingText={`Getting list of words that you have learned the past ${currentValue[0]} days`}
            />
          )}
          {!learnedWord.isLoading && learnedWord.data?.data?.length === 0 && (
            <p>
              You did not learn any words in the past {currentValue[0]} days
            </p>
          )}
          {!learnedWord.isLoading && (
            <p className="mb-4 text-sm italic">
              {learnedWord.data?.data?.join?.(', ')}
            </p>
          )}

          <p>{generatedStory.data?.data?.story}</p>
        </div>

        {!learnedWord.isLoading && (
          <LoadingButton
            isLoading={generatedStory.isLoading}
            onClick={() => generatedStory.start([debouncedDay])}
            className="mt-2"
          >
            {generatedStory.data?.data?.story ? 'Re-generate' : 'Generate'}
          </LoadingButton>
        )}
      </DialogContent>
    </Dialog>
  );
}
