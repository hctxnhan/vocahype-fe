import { cn } from '@/lib/utils/utils';
import { useMemo } from 'react';

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
      className={cn('py-4 text-2xl', className)}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
}
