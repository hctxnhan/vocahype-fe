import { ColumnDef } from '@tanstack/react-table';

export type TopicColumns = {
  id: number;
  name: string;
  description: string;
  wordCount: number;
};

export const columns: ColumnDef<TopicColumns>[] = [
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
  
];