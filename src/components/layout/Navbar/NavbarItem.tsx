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
          'cursor-pointer rounded-lg border-2 border-neutral-200 py-3 pl-8 pr-4 font-medium text-neutral-950/50 hover:bg-brand-300 hover:text-brand-50',
          {
            'rounded-lg border-t-0 border-x-0 border-b-[6px] border-b-sky-600 bg-brand-500 text-brand-50 hover:bg-brand-500':
              match,
            'hover:rounded-lg hover:border-brand-400': !match,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
