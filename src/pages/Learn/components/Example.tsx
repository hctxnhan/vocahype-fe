import { useMemo } from "react";

interface ExampleProps {
  example: string;
  word: string;
}

export function Example({ example, word }: ExampleProps) {
  const result = useMemo(() => {
    return example.replace(new RegExp(word, 'g'), `<strong>${word}</strong>`);
  }, [example, word]);
  return (
    <p className="text-2xl py-4" dangerouslySetInnerHTML={{ __html: result }} />
  );
}
