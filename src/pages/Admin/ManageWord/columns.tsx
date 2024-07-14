import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export type WordColumns = {
  word: string;
};

export const columns: ColumnDef<WordColumns>[] = [
  {
    accessorKey: 'word',
    header: 'Word',
  },
  {
    id: 'actions',
    size: 10,
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Link href={`/admin/edit-word/${row.original.word}`}>
            <Button variant={'secondary'}>Edit</Button>
          </Link>
          <Button variant={'destructive'}>Delete </Button>
        </div>
      );
    },
  },
];
