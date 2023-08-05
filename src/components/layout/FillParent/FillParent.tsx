import { cn } from '@/lib/utils/utils';

export function FillParent({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('center absolute inset-0 overflow-hidden', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
