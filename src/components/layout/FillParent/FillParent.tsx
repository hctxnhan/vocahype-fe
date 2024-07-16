import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils/utils';

export function FillParent({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        className={cn('center absolute inset-0 overflow-hidden', className)}
      >
        <div {...rest} />
      </motion.div>
    </AnimatePresence>
  );
}
