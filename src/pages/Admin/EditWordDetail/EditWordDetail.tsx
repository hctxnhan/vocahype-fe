import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRoute } from 'wouter';

import { getWord } from '@/api/words/getWord';
import { SerializedWordFormValues, updateWord } from '@/api/words/updateWord';
import { useToast } from '@/lib/hooks/useToast';

import { WordForm } from '../components/WordForm';

export function EditWordDetail() {
  const [, { wordId: id }] = useRoute('/admin/edit-word/:wordId');

  const { data: wordDetail, isLoading } = useSWR(
    id ? ['words/:wordId', id] : null,
    getWord.bind(null, { wordId: id as string })
  );

  const toast = useToast();

  const { isMutating, trigger } = useSWRMutation(
    id ? ['words/:wordId', id] : null,
    updateWord
  );

  const data = wordDetail?.data[0];

  if (!data) return null;

  async function onSubmit(values: SerializedWordFormValues) {
    await trigger({ wordId: id as string, body: values });

    toast.success({
      msg: 'Successfully updated word',
      title: 'Success',
    });
  }

  return (
    <WordForm
      isLoading={isMutating}
      onSubmit={void onSubmit}
      defaultValues={{
        id: data.id,
        word: data.word,
        syllable: data.syllable,
        phonetic: data.phonetic,
        point: data.point,
        meanings: data.meanings,
      }}
    />
  );
}
