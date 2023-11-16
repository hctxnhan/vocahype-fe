import { SlashIcon } from '@radix-ui/react-icons';
import { cloneElement } from 'react';
import { useLocation } from 'wouter';

import { checkChildren } from '@/lib/utils/checkChildren';
import { cn } from '@/lib/utils/utils';

interface BreadCrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className }: BreadCrumbProps) {
  const getValidChildren = checkChildren(children, BreadcrumbItem);
  const length = getValidChildren.length;

  return (
    <div className={cn('flex', className)}>
      {getValidChildren.map((child, index) => (
        <div className="flex items-center" key={index}>
          {cloneElement(child, {
            key: index,
          })}
          {index !== length - 1 && (
            <div className="px-0.5 font-medium">
              <SlashIcon width={16} height={16} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BreadcrumbItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const [_, navigate] = useLocation();

  return (
    <div
      onClick={() => href && navigate(href)}
      className={cn('font-bold uppercase text-accent-foreground/50', {
        'cursor-pointer hover:text-primary hover:underline': href,
      })}
    >
      {children}
    </div>
  );
}
