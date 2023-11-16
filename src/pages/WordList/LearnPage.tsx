import { WordList } from './WordList';

export function LearnPage() {
  return (
    <WordList breadcrumb={['Learn']} loadingText="Get ready to learn..." />
  );
}
