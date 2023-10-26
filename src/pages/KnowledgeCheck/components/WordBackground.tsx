import { motion } from 'framer-motion';

interface WordBackgroundProps {
  word: string;
}

const animate = [
  [-200, 0],
  [200, 0],
  [-400, 100],
  [400, -100],
];

export function WordBackground({ word }: WordBackgroundProps) {
  return (
    <div className="mx-auto center absolute -z-20 h-full flex-col gap-6">
      {animate.map(([initial, animate], i) => (
        <motion.div
          initial={{
            translateX: initial,
            opacity: 0,
          }}
          animate={{
            translateX: animate,
            opacity: 1,
          }}
          key={word + i.toString()}
          className="text-outline-transparent font-display text-9xl font-bold"
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
}
