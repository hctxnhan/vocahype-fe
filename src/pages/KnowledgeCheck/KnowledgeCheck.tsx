import { CarouselNumber } from '@/components/ui/CarouselNumber';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative h-full gap-16">
      <div className="flex h-full flex-col">
        <div className="flex h-full">
          <div className="center relative flex flex-1 justify-center overflow-hidden">
            <Card className="z-10 mb-16 flex h-fit flex-col bg-white/80 px-20 py-16">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-rose-500 ">verb</div>
                <Button variant={'ghost'} size="icon">
                  <SpeakerLoudIcon width={20} height={20} />
                </Button>
              </div>
              <h1 className="text-6xl font-black">{currentWords}</h1>
            </Card>
            <div className='absolute center flex-col gap-6'>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                key={currentWords + '1'}
                className="text-outline-transparent font-display text-9xl font-bold"
              >
                {currentWords}
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                key={currentWords + '2'}
                className="text-outline-transparent font-display text-9xl font-bold -translate-x-[200px]"
              >
                {currentWords}
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                key={currentWords + '3'}
                className="text-outline-transparent font-display text-9xl font-bold"
              >
                {currentWords}
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                key={currentWords + '4'}
                className="text-outline-transparent font-display text-9xl font-bold transform translate-x-[200px]"
              >
                {currentWords}
              </motion.div>
            </div>
          </div>
          <div className="relative flex-[0.2] overflow-hidden">
            <CarouselNumber total={data.length} current={currentIndex} />
          </div>
        </div>
        <div className="self-end gap-8">
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
    </div>
  );
}
