import { PropsWithChildren } from 'react';
import { Link, useRoute } from 'wouter';

import { cn } from '@/lib/utils/utils';

interface NavbarItemProps extends PropsWithChildren {
  href: string;
}

export function NavbarItem({ children, href }: NavbarItemProps) {
  const [match] = useRoute(href);

  return (
    <Link href={href}>
      <div
        className={cn(
          'cursor-pointer rounded-lg border-b-[6px] border-transparent py-3 pl-8 pr-4 font-medium text-neutral-950/50 hover:bg-brand-200',
          {
            'rounded-lg border-b-sky-600 bg-brand-500 text-sky-50 hover:bg-brand-500':
              match,
            'hover:rounded-lg hover:border-brand-300': !match,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
