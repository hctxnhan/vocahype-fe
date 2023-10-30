import { useLocation, useRoute } from 'wouter';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

interface NavbarItemProps extends ButtonProps {
  href: string;
}

export function NavbarItem({
  href,
  className,
  onClick,
  ...rest
}: NavbarItemProps) {
  const [match] = useRoute(href);
  const [_, navigate] = useLocation();

  function handleClick() {
    navigate(href);
  }

  return (
    <Button
      variant={'outline'}
      className={cn(
        'w-full text-accent-foreground/50 hover:bg-accent hover:text-accent-foreground/70',
        {
          'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground':
            match,
        },
        className
      )}
      onClick={handleClick}
      {...rest}
    />
  );
}
