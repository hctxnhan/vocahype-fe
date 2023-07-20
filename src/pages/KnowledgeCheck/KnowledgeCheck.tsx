import { CarouselNumber } from '@/components/ui/CarouselNumber';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

export function KnowledgeCheck() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentWords, setCurrentWords] = useState('');

  const data = [
    {
      id: 1,
      words: 'TEST',
    },
    {
      id: 2,
      words: 'DOG',
    },
    {
      id: 3,
      words: 'SLAUGHTER',
    },
    {
      id: 4,
      words: 'CAT',
    },
  ];

  const handleClick = () => {
    if (currentIndex < data.length) setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    setCurrentWords(data[currentIndex - 1]?.words);
  }, [currentIndex]);

  return (
    <div className="grid h-full grid-cols-12 gap-16">
      <div className="relative col-span-10 flex justify-center overflow-hidden">
        <Card className="z-10 mt-16 flex h-fit px-8 py-4">
          <div>
            <h1 className="text-5xl font-black">{currentWords}</h1>
            <div className="text-lg font-bold text-rose-500 ">verb</div>
          </div>
          <Button variant={'ghost'} size="icon">
            <SpeakerLoudIcon width={26} height={26} />
          </Button>
        </Card>
        <div className="text-outline-transparent absolute top-8 font-display text-9xl font-bold">
          {currentWords}
        </div>
        <div className="text-outline-transparent absolute right-80 top-44 font-display text-9xl font-bold">
          {currentWords}
        </div>
        <div className="text-outline-transparent absolute left-80 top-72 font-display text-9xl font-bold">
          {currentWords}
        </div>
      </div>
      <div className="relative col-span-2 overflow-hidden">
        <CarouselNumber total={data.length} current={currentIndex} />
      </div>

      <div className="absolute bottom-8 right-8 z-10 gap-8">
        <Button
          onClick={handleClick}
          variant={'special'}
          size={'xl'}
          className="min-w-[200px] bg-gradient-to-b from-rose-500 from-0% via-rose-600 via-50% to-rose-400 to-100% hover:bg-rose-500/80"
        >
          No
        </Button>
        <Button
          onClick={handleClick}
          variant={'special'}
          size={'xl'}
          className="ml-8 min-w-[200px] bg-gradient-to-b from-cyan-500 from-0% via-cyan-600 via-50% to-cyan-500 to-100% hover:bg-teal-500/80"
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
