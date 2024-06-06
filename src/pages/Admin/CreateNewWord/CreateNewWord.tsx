import useSWRMutation from 'swr/mutation';
import { useLocation } from 'wouter';

import { SerializedWordFormValues, createWord } from '@/api/words/manageWord';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { useToast } from '@/lib/hooks/useToast';

import { WordForm } from '../components/WordForm';

export function CreateNewWord() {
  useSetBreadcrumb([
    {
      label: 'Admin',
      href: '/admin',
    },
    'Create new word',
  ]);

  const toast = useToast();
  const [, navigate] = useLocation();

  const { isMutating, trigger } = useSWRMutation(
    ['create-new-word'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - fix this
    createWord
  );

  async function onSubmit(values: SerializedWordFormValues) {
    await trigger({ body: values });

    toast.success({
      msg: 'Successfully updated word',
      title: 'Success',
    });

    navigate('/admin/words');
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <WordForm onSubmit={onSubmit} isLoading={isMutating} />;
}
