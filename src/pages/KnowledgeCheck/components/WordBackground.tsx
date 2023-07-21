import { motion } from 'framer-motion';

interface WordBackgroundProps {
  word: string;
}

export function WordBackground({ word }: WordBackgroundProps) {
  return (
    <div className="center absolute flex-col gap-6">
      <motion.div
        initial={{
          transform: 'translateX(-200px)',
          opacity: 0,
        }}
        animate={{
          transform: 'translateX(0)',
          opacity: 1,
        }}
        key={word + '1'}
        className="text-outline-transparent font-display text-9xl font-bold"
      >
        {word}
      </motion.div>
      <motion.div
        initial={{
          transform: 'translateX(200px)',
          opacity: 0,
        }}
        animate={{
          transform: 'translateX(0)',
          opacity: 1,
        }}
        key={word + '2'}
        className="text-outline-transparent font-display text-9xl font-bold"
      >
        {word}
      </motion.div>
      <motion.div
        initial={{
          translateX: '-400px',
          opacity: 0,
        }}
        animate={{
          translateX: '100px',
          opacity: 1,
        }}
        key={word + '3'}
        className="text-outline-transparent font-display text-9xl font-bold"
      >
        {word}
      </motion.div>
      <motion.div
        initial={{
          translateX: '400px',
          opacity: 0,
        }}
        animate={{
          translateX: '-100px',
          opacity: 1,
        }}
        key={word + '4'}
        className="text-outline-transparent transform font-display text-9xl font-bold"
      >
        {word}
      </motion.div>
    </div>
  );
}
