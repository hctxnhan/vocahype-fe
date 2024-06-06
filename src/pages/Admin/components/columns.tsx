import { ColumnDef } from '@tanstack/react-table';


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
];
