import { motion } from 'framer-motion';

interface CarouselNumberProps {
  total: number;
  current: number;
}

export function CarouselNumber({ current, total }: CarouselNumberProps) {
  return (
    <>
      {[...Array(total)]?.map((_, num) => {
        return (
          <motion.div
            key={num}
            className="absolute left-0 right-0 text-center text-5xl font-medium"
            animate={{
              color: current === num + 1 ? '#FFFFFF' : '#ffffff70',
              bottom:
                current === num + 1
                  ? '50%'
                  : `${50 + (current - num - 1) * 10}%`,
              opacity: Math.abs(current - num - 1) > 2 ? 0 : 1,
            }}
          >
            {num + 1}
          </motion.div>
        );
      })}
    </>
  );
}
