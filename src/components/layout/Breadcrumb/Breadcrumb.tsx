import {
  BreadcrumbItem,
  Breadcrumb as BreadcrumbComponent,
} from '@/components/ui/breadcrumb';
import { useBreadcrumb } from '@/lib/hooks/useBreadcrumb';

export function Breadcrumb() {
  const { items } = useBreadcrumb();

  return (
    <BreadcrumbComponent className="mb-4">
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          href={typeof item === 'string' ? undefined : item.href}
        >
          {typeof item === 'string' ? item : item.label}
        </BreadcrumbItem>
      ))}
    </BreadcrumbComponent>
  );
}
