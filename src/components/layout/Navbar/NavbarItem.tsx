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
          'cursor-pointer py-4 pl-8 pr-4 font-medium text-neutral-950/50 hover:bg-neutral-50/20',
          {
            '-ml-1 border-l-4 border-neutral-950/70 text-neutral-950 hover:rounded-r-md':
              match,
            'hover:rounded-md': !match,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
