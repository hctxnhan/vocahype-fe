import { SerializedWordFormValues } from '@/api/words/manageWord';
import { WordFormValues } from '@/pages/Admin/components/WordForm';

export function transformWordForm(id: string, data: WordFormValues) {
  const serializedData: SerializedWordFormValues = {
    data: [
      {
        attributes: {
          id,
          word: data.word,
          phonetic: data.phonetic,
          syllable: data.syllable,
        },
      },
    ],
    included: data.meanings.map(m => ({
      type: 'meaning',
      attributes: {
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          examples: d.examples.map(e => e.example),
        })),
      },
      relationships: {
        pos: {
          data: {
            type: 'pos',
            id: m.pos.id,
          },
        },
      },
    })),
  };

  return serializedData;
}
