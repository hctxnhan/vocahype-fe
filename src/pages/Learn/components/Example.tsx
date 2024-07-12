import { useMemo } from 'react';

import { cn } from '@/lib/utils/utils';

interface ExampleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  example: string;
  word: string;
}

export function Example({ example, word, className, ...rest }: ExampleProps) {
  const result = useMemo(() => {
    return example.replace(new RegExp(word, 'g'), `<strong>${word}</strong>`);
  }, [example, word]);
  return (
    <p
      {...rest}
      className={cn('p-4 bg-muted rounded-md', className)}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
}
