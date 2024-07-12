import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRoute } from 'wouter';

import { getWord } from '@/api/words/getWord';
import { SerializedWordFormValues, updateWord } from '@/api/words/manageWord';
import { useToast } from '@/lib/hooks/useToast';


export function EditWordDetail() {
  const [, params] = useRoute('/admin/edit-word/:wordId');

  const id = params?.wordId;

  const { data: wordDetail } = useSWR(
    id ? ['words/:wordId', id] : null,
    getWord.bind(null, { wordId: id as string })
  );

  const toast = useToast();

  const { isMutating, trigger } = useSWRMutation(
    id ? ['words/:wordId', id] : null,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line - fix this
    updateWord
  );

  // const data = wordDetail?.data[0];

  // if (!data) return null;

  async function onSubmit(values: SerializedWordFormValues) {
    await trigger({ wordId: id as string, body: values });

    toast.success({
      msg: 'Successfully updated word',
      title: 'Success',
    });
  }

  return (
    <></>
    // <WordForm
    //   isLoading={isMutating}
    //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //   onSubmit={onSubmit}
    //   defaultValues={{
    //     id: data.id,
    //     word: data.word,
    //     syllable: data.syllable,
    //     phonetic: data.phonetic,
    //     point: data.point,
    //     meanings: data.meanings,
    //   }}
    // />
  );
}
