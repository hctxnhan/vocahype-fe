import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

export type WordColumns = {
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
    cell: () => {
      return (
        <div className="flex flex-row gap-2">
          <Button variant={'destructive'}>Delete </Button>
        </div>
      );
    },
  },
];

export const data = [
  {
    word: 'Hello',
    phonetic: 'həˈloʊ',
    syllable: 2,
    point: 5,
  },
  {
    word: 'World',
    phonetic: 'wɝːld',
    syllable: 1,
    point: 5,
  },
  {
    word: 'React',
    phonetic: 'ɹiˈækt',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Table',
    phonetic: 'ˈteɪbl̩',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Column',
    phonetic: 'ˈkɑːləm',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Row',
    phonetic: 'ɹoʊ',
    syllable: 1,
    point: 5,
  },
  {
    word: 'Cell',
    phonetic: 'sɛl',
    syllable: 1,
    point: 5,
  },
  {
    word: 'Header',
    phonetic: 'ˈhɛdɝ',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Footer',
    phonetic: 'ˈfʊtɝ',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Body',
    phonetic: 'ˈbɑːdi',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Sidebar',
    phonetic: 'ˈsaɪdˌbɑɹ',
    syllable: 3,
    point: 5,
  },
  {
    word: 'Navbar',
    phonetic: 'ˈnævˌbɑɹ',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Footer',
    phonetic: 'ˈfʊtɝ',
    syllable: 2,
    point: 5,
  },
  {
    word: 'Main',
    phonetic: 'meɪn',
    syllable: 1,
    point: 5,
  },
];
