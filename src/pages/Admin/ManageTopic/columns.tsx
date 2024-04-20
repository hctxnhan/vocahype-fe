import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

export type WordColumns = {
  name: string;
  description: string;
  wordCount: number;
};

export const columns: ColumnDef<WordColumns>[] = [
  {
    accessorKey: 'name',
    header: 'Topic Name'
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'wordCount',
    header: 'Word Count',
  },
  {
    id: 'actions',
    size: 10,
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Button variant={'secondary'}>Edit</Button>
          <Button variant={'destructive'}>Delete </Button>
        </div>
      );
    },
  },
];