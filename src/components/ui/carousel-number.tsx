import { motion } from 'framer-motion';
interface CarouselNumberProps {
  total: number;
  current: number;
}

export function CarouselNumber({ current, total }: CarouselNumberProps) {
  return (
    <>
      {Array.from({ length: total })?.map((_, index) => {
        const num = ++index;
        const diff = Math.abs(current - num);
        return (
          <motion.div
            key={num}
            className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-center text-center font-medium text-sky-600 transition"
            animate={{
              fontSize: `${100 * (1 - Math.abs(index - current) / 3)}px`,
              bottom: current === num ? '50%' : `${50 + (current - num) * 15}%`,
              opacity: 1 - diff / 3,
            }}
          >
            {num}
          </motion.div>
        );
      })}
    </>
  );
}
