import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { diffChars } from 'diff';
import levenshtein from 'fast-levenshtein';
import { Mic } from 'lucide-react';
import { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface PronunciationCheckingProps {
  word: string;
}

function calculateSimilarity(word: string, userWord: string) {
  const word64 = btoa(word.toLowerCase());
  const userWord64 = btoa(userWord.toLowerCase());

  const distance = levenshtein.get(word64, userWord64);

  const maxLength = Math.max(word64.length, userWord64.length);
  const similarity = ((maxLength - distance) / maxLength) * 100;
  return similarity;
}

function calculateDiff(word: string, userWord: string) {
  const wordInWords = word.split(' ');
  const userWordInWords = userWord.split(' ');

  const diffEachWord = wordInWords.map((word, index) => {
    return diffChars(word, userWordInWords[index] ?? '');
  });

  return diffEachWord;
}

const Feedback = ({
  correctWord,
  userWord,
}: {
  correctWord: string;
  userWord: string;
}) => {
  const diff = calculateDiff(correctWord.toLowerCase(), userWord.toLowerCase());

  return (
    <div className="text-lg">
      {diff.map((word, index) => {
        return word.map((part, index) => {
          if (part.added) return;

          const colorClass = part.removed ? 'text-red-500' : 'text-green-500';
          return (
            <span key={index} className={colorClass}>
              {part.value}
            </span>
          );
        });
      })}

      <div className="text-center text-sm italic">{userWord.toLowerCase()}</div>
    </div>
  );
};

const percentageToColor = (percentage: number) => {
  if (percentage > 90) return 'bg-green-500';
  if (percentage > 70) return 'bg-green-400';
  if (percentage > 50) return 'bg-yellow-500';
  if (percentage > 30) return 'bg-yellow-400';
  if (percentage > 10) return 'bg-red-500';
  return 'bg-red-400';
};

export function PronunciationChecking({ word }: PronunciationCheckingProps) {
  const {
    transcript: currentTranscript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();
  const [transcript, setTranscript] = useState('');
  // convert transcript to base64

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false });
  const stopListening = () => {
    setTranscript(currentTranscript);
    void SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        onClick={() => {
          if (listening) {
            void resetTranscript();
            void stopListening();
          } else {
            void startListening();
          }
        }}
        className={cn(
          'relative flex h-20 w-20 cursor-pointer items-center justify-center gap-2 rounded-full bg-muted transition duration-300 hover:bg-muted/80 active:bg-primary/90',
          {
            'bg-primary': listening,
          },
          transcript && percentageToColor(calculateSimilarity(word, transcript))
        )}
      >
        {listening && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'
            )}
          ></span>
        )}
        <Mic className="h-10 w-10" />
      </button>
      <Feedback correctWord={word} userWord={transcript} />
    </div>
  );
}
