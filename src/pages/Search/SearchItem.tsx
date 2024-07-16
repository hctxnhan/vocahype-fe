import { SpeakerLoudIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface SearchItemProps {
  word: string;
  selectWord: (word: string) => void;
}

export function SearchItem({ word, selectWord }: SearchItemProps) {
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
      onClick={() => selectWord(word)}
      className="relative my-1 ml-1 mr-2 flex h-fit cursor-pointer gap-2 overflow-hidden rounded-md bg-accent px-8 py-4 transition hover:bg-primary hover:text-primary-foreground"
      key={word}
    >
      {/* {learningStatus !== WORD_STATUS_LEARN.TO_LEARN && (
        <Progress
          className={cn('absolute inset-x-0 top-0 h-1', {
            'bg-green-400': learningStatus === WORD_STATUS_LEARN.MASTERED,
            'bg-neutral-300': learningStatus === WORD_STATUS_LEARN.IGNORE,
            'text-red-500': true,
          })}
          value={getLearningPercentage(learningLevel)}
        />
      )} */}
      <p className="text-2xl font-semibold">{word}</p>
      {/* {word.pronunciation?.all ? <p>[{word.pronunciation?.all}]</p> : null} */}
      <Button
        onClick={playPronunciation(word)}
        size={'icon'}
        variant={'ghost'}
        className="flex items-center gap-4 transition-none"
      >
        <SpeakerLoudIcon width={16} height={16} />
      </Button>
    </Button>
  );
}
