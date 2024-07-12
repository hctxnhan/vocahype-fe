import { Plus } from 'lucide-react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { deleteTopic } from '@/api/words/manageTopic';
import { getTopicsList } from '@/api/words/topics';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import { FloatingButton } from '@/components/ui/floating-button';
import { Link } from '@/components/ui/link';
import { useMatchMutate } from '@/lib/hooks/useMatchMutate';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { useToast } from '@/lib/hooks/useToast';
  
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

  const mutate = useMatchMutate();

  const toast = useToast();

  const { isMutating, trigger } = useSWRMutation(
    ['create-new-word'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - fix this
    deleteTopic
  );

  async function handleDeleteTopic(id: number) {
    await trigger({ topicId: id });

    toast.success({
      msg: 'Successfully deleted topic',
      title: 'Success',
    });

    await mutate(/topics/);
  }

  return (
    <div>
      {isLoading ||
        (isMutating && (
          <FillParent>
            <Loading loadingText="Getting topics..." />
          </FillParent>
        ))}
      {!isLoading && (
        <>
          <Link href="/admin/create-topic">
            <FloatingButton className="z-10 items-center justify-center gap-1">
              <Plus size={14} />
              Create topic
            </FloatingButton>
          </Link>
          <DataTable
            columns={[
              ...columns,
              {
                id: 'actions',
                size: 10,
                header: 'Actions',
                cell: ({ row }) => {
                  return (
                    <div className="flex flex-row gap-2">
                      <Link href={`/admin/edit-topic/${row.original.id}`}>
                        <Button disabled={isMutating} variant={'secondary'}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        disabled={isMutating}
                        variant={'destructive'}
                        onClick={() => void handleDeleteTopic(row.original.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                },
              },
            ]}
            data={data?.data}
          />
        </>
      )}
    </div>
  );
}
