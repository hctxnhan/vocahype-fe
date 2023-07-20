import { motion } from 'framer-motion';

interface CarouselNumberProps {
  total: number;
  current: number;
}

export function CarouselNumber({ current, total }: CarouselNumberProps) {
  return (
    <>
      {Array.from(Array(total))?.map((_, index) => {
        const num = ++index
        return (
          <motion.div
            key={num}
            className="absolute left-0 right-0 text-center text-5xl font-medium"
            animate={{
              color: current === num ? '#FFFFFF' : '#ffffff70',
              bottom:
                current === num
                  ? '50%'
                  : `${50 + (current - num) * 10}%`,
              opacity: Math.abs(current - num) > 2 ? 0 : 1,
            }}
          >
            {num}
          </motion.div>
        );
      })}
    </>
  );
}
