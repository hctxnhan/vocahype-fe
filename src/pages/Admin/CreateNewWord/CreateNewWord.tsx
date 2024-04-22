import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { WordForm } from '../components/WordForm';

export function CreateNewWord() {
  useSetBreadcrumb([
    {
      label: 'Admin',
      href: '/admin',
    },
    'Create new word',
  ]);

  function handleSubmit(data) {
    console.log('submit', data);
  }

  return <WordForm onSubmit={handleSubmit} />;
}
