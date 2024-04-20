import useSWR from 'swr';
import { useRoute } from 'wouter';

import { getWord } from '@/api/words/getWord';

import { WordForm } from '../components/WordForm';

export function EditWordDetail() {
  const [, { wordId: id }] = useRoute('/admin/edit-word/:wordId');

  const { data: wordDetail, isLoading } = useSWR(
    id ? ['words/:wordId', id] : null,
    getWord.bind(null, { wordId: id as string })
  );

  const data = wordDetail?.data[0];

  if (!data) return null;

  return (
    <WordForm
      defaultValues={{
        word: data.word,
        syllable: data.syllable,
        phonetic: data.phonetic,
        point: data.point,
        meanings: data.meanings,
      }}
    />
  );
}
