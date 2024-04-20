import { useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { cn } from '@/lib/utils/utils';

import { SelectedWordTable } from './Table/SelectedWord';

export function AddWordManuallyForm() {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const debounceValue = useDebounce(inputRef.current?.value, 1000);

  function fakeSearchApi(query: string) {
    return new Promise<string[]>(resolve => {
      setTimeout(() => {
        resolve([query, query + '1', query + '2']);
      }, 1000);
    });
  }

  useEffect(() => {
    if (!debounceValue) return;

    void fakeSearchApi(debounceValue).then(data => {
      setData(data);
    });
  }, [debounceValue]);

  useEffect(() => {
    if (!inputRef.current) return;

    const ref = inputRef.current;

    const handleFocus = () => {
      setIsFocus(true);
    };

    const handleBlur = () => {
      setIsFocus(false);
    };

    ref.addEventListener('focus', handleFocus);
    ref.addEventListener('blur', handleBlur);

    return () => {
      ref?.removeEventListener('focus', handleFocus);
      ref?.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search or any other action here
  };

  const handleSelectValue = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className={cn('relative flex h-auto w-full gap-2 max-md:gap-1', {
          'z-[9999]': isFocus,
        })}
      >
        <Input
          ref={inputRef}
          placeholder="Search for a word"
          className="font-dinRound mb-4"
        />

        {data.length > 0 && isFocus && debounceValue?.length && (
          <div className="absolute top-full z-[9999] mt-2 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
            {data.map((item, index) => (
              <div
                key={index}
                className="border-b border-solid border-border px-8 py-4 text-sm last:border-b-0 hover:cursor-pointer hover:bg-accent hover:last:rounded-b-lg"
                onClick={() => handleSelectValue(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </form>

      <SelectedWordTable />
    </div>
  );
}
