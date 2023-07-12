import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { vh } from '@/lib/utils/vh';

const buttonVariants = cva(['border transition-all py-4 px-8 border-black font-sans'], {
  variants: {
    variant: {
      outline: 'hover:bg-slate-100',
      solid: 'bg-slate-950 text-white hover:bg-slate-800',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  uppercase?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, uppercase, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        className={vh(
          buttonVariants({ variant }),
          uppercase && 'uppercase',
          className
        )}
        {...props}
      ></button>
    );
  }
);

Button.displayName = 'Button';
