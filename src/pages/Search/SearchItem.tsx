import { SpeakerLoudIcon } from '@radix-ui/react-icons';

import { Comprehension } from '@/api/model/Comprehension';
import { Word } from '@/api/model/Word';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WORD_STATUS_LEARN } from '@/lib/enums/word';
import { cn, getLearningPercentage } from '@/lib/utils/utils';

interface SearchItemProps {
  word: Word & { comprehension: Comprehension };
  selectWord: (wordId: string) => void;
}

export function SearchItem({ word, selectWord }: SearchItemProps) {
  const learningStatus = word.comprehension.status ?? 0;
  const learningLevel =
    learningStatus === WORD_STATUS_LEARN.LEARNING
      ? word.comprehension.level ?? 0
      : 0;

  function playPronunciation(word: string) {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const utterance = new SpeechSynthesisUtterance(word);
      speechSynthesis.speak(utterance);
    };
  }

  return (
    <Button
      variant={'ghost'}
      onClick={() => selectWord(word.word)}
      className="relative my-1 ml-1 mr-2 flex h-fit cursor-pointer flex-col gap-2 overflow-hidden rounded-md bg-accent px-8 py-4 transition hover:bg-primary hover:text-primary-foreground"
      key={word.word}
    >
      {learningStatus !== WORD_STATUS_LEARN.TO_LEARN && (
        <Progress
          className={cn('absolute inset-x-0 top-0 h-1', {
            'bg-green-400': learningStatus === WORD_STATUS_LEARN.MASTERED,
            'bg-neutral-300': learningStatus === WORD_STATUS_LEARN.IGNORE,
            'text-red-500': true,
          })}
          value={getLearningPercentage(learningLevel)}
        />
      )}
      <div className="center gap-4">
        <p className="text-2xl font-semibold">{word.word}</p>
      </div>
      <div className="center gap-2">
        {word.pronunciation?.all ? <p>[{word.pronunciation?.all}]</p> : null}
        <Button
          onClick={playPronunciation(word.word)}
          size={'icon'}
          variant={'ghost'}
          className="flex items-center gap-4 transition-none"
        >
          <SpeakerLoudIcon width={16} height={16} />
        </Button>
      </div>
    </Button>
  );
}
