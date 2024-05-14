import useSWRMutation from 'swr/mutation';
import { useLocation } from 'wouter';

import { SerializedWordFormValues, createWord } from '@/api/words/updateWord';
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
    createWord
  );

  async function onSubmit(values: SerializedWordFormValues) {
    await trigger({ body: values });

    toast.success({
      msg: 'Successfully updated word',
      title: 'Success',
    });

    navigate('/admin');
  }

  return <WordForm onSubmit={onSubmit} isLoading={isMutating} />;
}
