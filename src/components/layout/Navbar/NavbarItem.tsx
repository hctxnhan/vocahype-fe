import { cn } from '@/lib/utils/utils';
import { PropsWithChildren } from 'react';
import { Link, useRoute } from 'wouter';
interface NavbarItemProps extends PropsWithChildren {
  href: string;
}

export function NavbarItem({ children, href }: NavbarItemProps) {
  const [match] = useRoute(href);

  return (
    <Link href={href}>
      <div
        className={cn(
          'cursor-pointer rounded-lg py-3 pl-8 pr-4 font-medium text-neutral-950/50 hover:bg-sky-200',
          {
            'rounded-lg border-b-4 border-b-sky-600 bg-sky-500 text-sky-50 hover:bg-sky-500':
              match,
            'hover:rounded-lg': !match,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
