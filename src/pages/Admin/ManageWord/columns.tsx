import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export type WordColumns = {
  id: number;
  word: string;
  phonetic: string;
  syllable: number;
  point: number;
};

export const columns: ColumnDef<WordColumns>[] = [
  {
    accessorKey: 'word',
    header: 'Word',
  },
  {
    accessorKey: 'phonetic',
    header: 'Phonetic',
  },
  {
    accessorKey: 'syllable',
    header: 'Syllable',
  },
  {
    accessorKey: 'point',
    header: 'Point',
  },
  {
    id: 'actions',
    size: 10,
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Link href={`/admin/edit-word/${row.original.id}`}>
            <Button variant={'secondary'}>Edit</Button>
          </Link>
          <Button variant={'destructive'}>Delete </Button>
        </div>
      );
    },
  },
];
