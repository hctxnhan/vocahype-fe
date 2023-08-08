import { Button } from '@/components/ui/button';
import {
  QuestionMarkCircledIcon,
  SpeakerLoudIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
  ChevronDownIcon,
} from '@radix-ui/react-icons';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Example } from './components/Example';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { cn } from '@/lib/utils/utils';

export function Learn() {
  const [currentMean, setCurrentMean] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const nextMean = useRef(1);

  const listMean = [
    'the killing of many people cruelly and unfairly, especially in a war.the killing of many people cruelly and unfairly, especially in a war.',
    'the killing of many people cruelly and unfairly, especially in a war.2',
    'the killing of many people cruelly and unfairly, especially in a war.3the killing of many people cruelly and unfairly, especially in a war.',
    'the killing of many people cruelly and unfairly, especially in a war.3the killing of many people cruelly and unfairly, especially in a war.',
    'the killing of many people cruelly and unfairly, especially in a war.3the killing of many people cruelly and unfairly, especially in a war5.',
  ];

  const handleClick = (next: number) => {
    const current = currentMean + next;
    if (current >= 0 && current < listMean.length) {
      nextMean.current = current - currentMean;
      setCurrentMean(current);
    }
  };

  function playAudio() {
    const utterance = new SpeechSynthesisUtterance('SLAUGHTER');
    speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    animate('.arrow', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });
    animate(
      '.card-image',
      isOpen
        ? {
            height: 300,
          }
        : {
            height: 160,
          }
    );
  }, [isOpen]);

  return (
    <div ref={scope} className="relative flex h-full flex-col gap-4">
      <motion.div
        style={{
          backgroundImage: `url("https://static.theprint.in/wp-content/uploads/2022/04/Web_Photo_Editor-71-1024x576.jpg?compress=true")`,
        }}
        className="card-image relative h-[160] overflow-hidden rounded-3xl bg-cover bg-no-repeat px-16 py-8 text-white transition duration-500"
      >
        <div className=" relative z-50">
          <div className="flex items-center gap-4">
            <div className="font-serif text-4xl font-black">SLAUGHTER</div>
            <Button onClick={playAudio} variant={'ghost'} size="icon">
              <SpeakerLoudIcon width={20} height={20} />
            </Button>
          </div>
          <div className="font-sans font-normal">/ˈslɔː.tər/</div>
          <div className="flex items-center gap-2 font-display font-bold">
            <div>verb</div>
            <QuestionMarkCircledIcon width={18} height={18} />
          </div>
        </div>
        <FillParent className="z-[9] bg-slate-800/50 transition" />
        <ChevronDownIcon
          onClick={() => setIsOpen(!isOpen)}
          width={30}
          height={30}
          className="arrow absolute right-8 z-10"
        />
      </motion.div>
      <div className="flex items-center justify-center gap-16 font-display text-sm font-semibold">
        <div
          onClick={handleClick.bind(null, -1)}
          className={cn(
            'flex items-center hover:cursor-pointer',
            currentMean == 0 && 'pointer-events-none text-slate-500'
          )}
        >
          <TriangleLeftIcon width={40} height={40} />
          <div>previous</div>
        </div>
        <div
          onClick={handleClick.bind(null, 1)}
          className={cn(
            'flex items-center hover:cursor-pointer',
            currentMean == listMean.length - 1 &&
              'pointer-events-none text-slate-500'
          )}
        >
          <div>next</div>
          <TriangleRightIcon width={40} height={40} />
        </div>
      </div>
      <div className="relative flex items-center justify-center overflow-hidden text-lg font-bold transition-all">
        <AnimatePresence>
          <motion.div
            className=" min-h-[60px] transition-all duration-1000"
            key={currentMean}
            initial={{
              transform: `translateX(${-nextMean.current * 100}px)`,
              opacity: 0,
            }}
            animate={{
              transform: 'translateX(0)',
              opacity: 1,
            }}
            exit={{
              position: 'absolute',
              transform: `translateX(${nextMean.current * 100}px)`,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {listMean[currentMean]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div>
        <Example
          className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-300 [&:not(:last-child)]:border-opacity-50"
          example="“Hardly anyone in the town escaped the slaughter when the rebels were
          defeated.”"
          word="slaughter"
        />
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-between gap-4">
        <Button className="w-full rounded-3xl bg-slate-400 px-8 py-6 font-semibold">
          HARD
        </Button>
        <Button className="w-full rounded-3xl bg-slate-500 px-8 py-6 font-semibold">
          GOOD
        </Button>
        <Button className="w-full rounded-3xl bg-slate-600 px-8 py-6 font-semibold">
          EASY
        </Button>
      </div>
    </div>
  );
}
