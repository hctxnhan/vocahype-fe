import { Plus } from 'lucide-react';
import useSWR from 'swr';

import { getTopicsList } from '@/api/words/topics';
import { FloatingButton } from '@/components/ui/floating-button';
import { Link } from '@/components/ui/link';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { DataTable } from './Table';
import { columns } from './columns';

export function ManageTopic() {
  const { data, isLoading } = useSWR('/topics', getTopicsList);
  useSetBreadcrumb([
    {
      label: 'Admin',
      href: '/admin',
    },
    'Manage Topic',
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href='/admin/create-topic'>
        <FloatingButton className="z-10 items-center justify-center gap-1">
          <Plus size={14} />
          Create topic
        </FloatingButton>
      </Link>
      <DataTable columns={columns} data={data?.data} />
    </div>
  );
}
