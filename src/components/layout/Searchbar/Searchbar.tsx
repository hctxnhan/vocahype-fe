import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFocus } from '@/lib/hooks/useFocus';
import { cn } from '@/lib/utils/utils';
import { useRef } from 'react';
import { useLocation } from 'wouter';
import { FillParent } from '../FillParent/FillParent';

export function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocus = useFocus(inputRef);
  const [, navigate] = useLocation();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      navigate(`/words?search=${query}`);
      inputRef.current?.blur();
    }
  }

  const historyList = ['Test', 'Play', 'Hi'];

  return (
    <>
      {isFocus && <FillParent className="z-[9998] bg-black/70"></FillParent>}
      <form
        onSubmit={handleSearch}
        className={cn('relative flex h-full w-full gap-2', {
          'z-[9999]': isFocus,
        })}
      >
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            placeholder="Find definition for..."
            className="placeholder:text-neutral-300"
          />
          {isFocus && (
            <div className="absolute top-12 w-full rounded-lg bg-white">
              <div className="flex justify-between px-[32px] py-[16px]">
                <div className="font-semibold text-slate-400">
                  RECENT SEARCH
                </div>
                <div className="text-red-700 hover:cursor-pointer">
                  Remove all
                </div>
              </div>
              {historyList?.map(history => (
                <div className="px-[32px] py-[16px] text-sm text-slate-800 hover:cursor-pointer hover:bg-slate-100">
                  {history}
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
