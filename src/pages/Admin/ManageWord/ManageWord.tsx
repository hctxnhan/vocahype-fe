import { Plus } from 'lucide-react';

import { FloatingButton } from '@/components/ui/floating-button';
import { Link } from '@/components/ui/link';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { WordList } from '../components/WordList';
import { columns } from '../components/columns';

export function ManageWord() {
  useSetBreadcrumb([
    { label: 'Admin', href: '/admin' },
    { label: 'Manage Word' },
  ]);

  // const mutate = useMatchMutate();
  // const toast = useToast();

  // const { trigger } = useSWRMutation(
  //   ['create-new-word'],
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore-next-line - fix this
  //   deleteWord
  // );

  // async function handleDeleteWord(id: number) {
  //   await trigger({ wordId: id });

  //   await mutate(/search/);

  //   toast.success({
  //     msg: 'Successfully deleted word',
  //     title: 'Success',
  //   });
  // }

  return (
    <div>
      <Link href="/admin/create-word">
        <FloatingButton className="z-10 items-center justify-center gap-1">
          <Plus size={14} />
          Create word
        </FloatingButton>
      </Link>

      <WordList columns={columns} />
    </div>
  );
}
