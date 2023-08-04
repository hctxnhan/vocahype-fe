import { cn } from '@/lib/utils/utils';
import { PropsWithChildren } from 'react';
import { Link } from 'wouter';
interface NavbarItemProps extends PropsWithChildren {
  selected?: boolean;
  href: string;
}

export function NavbarItem({ selected, children, href }: NavbarItemProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'cursor-pointer py-4 pl-8 pr-4 font-medium text-neutral-950/50 hover:bg-neutral-50/20',
          {
            '-ml-1 border-l-4 border-neutral-950/70 text-neutral-950 hover:rounded-r-md':
              selected,
            'hover:rounded-md': !selected,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
