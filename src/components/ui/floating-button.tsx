import { ComponentProps } from 'react';

import { cn } from '@/lib/utils/utils';

import { Button } from './button';

export function FloatingButton(props: ComponentProps<typeof Button>) {
  return <Button {...props} className={cn('fixed z-10 bottom-4 right-4',
    props.className
  )} />;
}
