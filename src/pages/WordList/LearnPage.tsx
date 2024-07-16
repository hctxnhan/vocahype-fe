import { WordList } from './WordList';

export function LearnPage() {
  return (
    <WordList
      needToFinishLearning
      breadcrumb={['Learn']}
      loadingText="Get ready to learn..."
    />
  );
}
