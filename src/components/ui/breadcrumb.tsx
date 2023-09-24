import { SlashIcon } from '@radix-ui/react-icons';
import { cloneElement } from 'react';

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
      {getValidChildren.map((child, index) => {
        return (
          <div className="flex items-center" key={index}>
            {cloneElement(child, { key: index })}
            {index !== length - 1 && (
              <div className="px-0.5 font-medium">
                <SlashIcon width={16} height={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-bold uppercase text-neutral-950/70">{children}</div>
  );
}
