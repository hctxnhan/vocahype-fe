import { Link } from 'wouter';

import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils/utils';

export function AdminPage() {
  useSetBreadcrumb(['Admin']);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Link
        href="/admin/words"
        className={cn(
          'vh-flex-column h-full cursor-pointer space-y-1 rounded-md border-2 bg-muted/70 p-3 transition-colors hover:bg-primary hover:text-primary-foreground'
        )}
      >
        <span className="font-medium uppercase">Manage Words</span>
        <span className={cn('flex-1 text-sm')}>Manage words in the system</span>
      </Link>
      <Link
        href="/admin/topics"
        className={cn(
          'vh-flex-column h-full cursor-pointer space-y-1 rounded-md border-2 bg-muted/70 p-3 transition-colors hover:bg-primary hover:text-primary-foreground'
        )}
      >
        <span className="font-medium uppercase">Manage Topics</span>
        <span className={cn('flex-1 text-sm')}>
          Create, edit, delete all topics in the system, especially we can
          create topic based on subtitle file of a movie or a TV show
        </span>
      </Link>
    </div>
  );
}
