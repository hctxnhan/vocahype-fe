import { ColumnDef } from '@tanstack/react-table';


export type WordColumns = {
  word: string;
};

export const columns: ColumnDef<WordColumns>[] = [
  {
    accessorKey: 'word',
    header: 'Word',
  },
];
