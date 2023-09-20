import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ColorNames, colors } from '@/lib/configs/tailwindConfig';
import { useHover } from '@/lib/hooks/useHover';
import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg border-b-[6px] font-dinRound text-sm font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-800',
  {
    variants: {
      variant: {
        default:
          'border-brand-800 bg-brand-600 text-neutral-50 hover:bg-brand-700/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        destructive:
          'border-red-800 bg-red-500 text-neutral-50 hover:bg-red-600/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90',
        outline:
          'border-2 border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost:
          'border-none hover:bg-neutral-100/50 hover:text-neutral-900 focus-visible:outline-none dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'border-2 border-b-[6px] text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'px-8 py-3 text-lg',
        xl: 'px-8 py-4',
        icon: 'h-10 w-10 border-0 hover:bg-neutral-100',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        size: 'default',
        className: 'p-0 border-none outline-none underline-offset-2 h-fit normal-case text-brand-500',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: ColorNames;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const {
      hovering, bind
    } = useHover();
    const Comp = asChild ? Slot : 'button';

    const colorHex = color ? colors[color] : undefined;

    const colorStyle = colorHex ? {
      backgroundColor: hovering ? colorHex[700] : colorHex[600],
      color: colorHex[50],
      borderColor: colorHex[800],
    } : {};

    return (
      <Comp
        {...bind}
        style={colorStyle}
        className={cn(buttonVariants({ variant, size  }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
