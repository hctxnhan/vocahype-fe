import { motion } from 'framer-motion';

import { cn } from '@/lib/utils/utils';

interface CarouselNumberProps {
  total: number;
  current: number;
  direction?: 'horizontal' | 'vertical';
}

export function CarouselNumber({
  current,
  total,
  direction = 'vertical',
}: CarouselNumberProps) {
  return (
    <div className='w-full'>
      {Array.from({ length: total })?.map((_, index) => {
        const num = ++index;
        const diff = Math.abs(current - num);
        if (direction === 'vertical') {
          return (
            <motion.div
              key={num}
              className={cn(
                'absolute bottom-0 left-0 right-0 flex h-16 items-center justify-center text-center font-medium text-foreground/40 transition',
              )}
              animate={{
                fontSize: `${100 * (1 - Math.abs(index - current) / 3)}px`,
                bottom:
                  current === num ? '50%' : `${50 + (current - num) * 15}%`,
                opacity: 1 - diff / 3,
                display: 1 - diff / 3 > 0.01 ? 'flex' : 'none',
              }}
            >
              {num}
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={num}
              className="absolute left-0 right-0 top-1/2 flex w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center font-medium text-foreground/40 transition"
              animate={{
                fontSize: `${80 * (1 - Math.abs(index - current) / 4)}px`,
                left: current === num ? '50%' : `${50 + (current - num) * 30}%`,
                opacity: 1 - diff / 3,
                display: 1 - diff / 3 > 0.01 ? 'flex' : 'none',
              }}
            >
              {num}
            </motion.div>
          );
        }
      })}
    </div>
  );
}
