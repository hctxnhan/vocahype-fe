import { checkChildren } from '@/lib/utils/checkChildren';
import { cloneElement } from 'react';
import { CaretRightIcon } from '@radix-ui/react-icons';

interface BreadCrumbProps {
  children: React.ReactNode;
}

export function Breadcrumb({ children }: BreadCrumbProps) {
  const getValidChildren = checkChildren(children, BreadcrumbItem);
  const length = getValidChildren.length;

  return (
    <div className="flex">
      {getValidChildren.map((child, index) => {
        return (
          <div className="flex items-center">
            {cloneElement(child, { key: index })}
            {index !== length - 1 && (
              <div className="px-1">
                <CaretRightIcon />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return <div className="font-medium text-neutral-950/70">{children}</div>;
}
