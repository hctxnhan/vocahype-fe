import { Plus } from 'lucide-react';
import useSWRMutation from 'swr/mutation';

import { deleteWord } from '@/api/words/manageWord';
import { Button } from '@/components/ui/button';
import { FloatingButton } from '@/components/ui/floating-button';
import { Link } from '@/components/ui/link';
import { useMatchMutate } from '@/lib/hooks/useMatchMutate';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { useToast } from '@/lib/hooks/useToast';

import { WordList } from '../components/WordList';
import { columns } from '../components/columns';


export function ManageWord() {
  useSetBreadcrumb([
    { label: 'Admin', href: '/admin' },
    { label: 'Manage Word' },
  ]);

  const mutate = useMatchMutate()
  const toast = useToast();

  const { trigger } = useSWRMutation(
    ['create-new-word'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - fix this
    deleteWord
  );

  async function handleDeleteWord(id: number) {
    await trigger({ wordId: id });

    await mutate(/search/);

    toast.success({
      msg: 'Successfully deleted word',
      title: 'Success',
    });
  }

  return (
    <div>
      <Link href="/admin/create-word">
        <FloatingButton className="z-10 items-center justify-center gap-1">
          <Plus size={14} />
          Create word
        </FloatingButton>
      </Link>

      <WordList
        columns={[
          ...columns,
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
                  <Button
                    onClick={() => void handleDeleteWord(row.original.id)}
                    variant={'destructive'}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
