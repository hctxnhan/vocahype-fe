import { motion } from 'framer-motion';
import colors from 'tailwindcss/colors';
interface CarouselNumberProps {
  total: number;
  current: number;
}

export function CarouselNumber({ current, total }: CarouselNumberProps) {
  return (
    <>
      {Array.from(Array(total))?.map((_, index) => {
        const num = ++index;
        const diff = Math.abs(current - num);
        return (
          <motion.div
            key={num}
            className="absolute left-0 right-0 flex h-16 items-center justify-center text-center font-medium transition"
            style={{}}
            animate={{
              fontSize: `${100 * (1 - Math.abs(index - current) / 3)}px`,
              color: current === num ? colors['white'] : colors['white'],
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
