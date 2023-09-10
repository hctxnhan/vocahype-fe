import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/lib/utils/localStorage';
import { cn } from '@/lib/utils/utils';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { FillParent } from '../FillParent/FillParent';

export function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerInputRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  useClickOutside(containerInputRef, isBlur => {
    setIsFocus(!isBlur);
  });
  const [, navigate] = useLocation();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      navigate(`/words?search=${query}`);
      const newHistoryList = [...new Set([query, ...history])];
      setLocalStorageItem('historySearch', newHistoryList);
      setHistory(newHistoryList);
    }
  }

  const onRemoveAll = () => {
    inputRef.current?.focus();
    removeLocalStorageItem('historySearch');
    setHistory([]);
  };

  const onClickWord = (word: string) => {
    if (inputRef.current) {
      inputRef.current.value = word;
      setIsFocus(false);
      navigate(`/words?search=${word}`);
    }
  };

  useEffect(() => {
    setHistory(getLocalStorageItem<string[]>('historySearch') || []);
  }, []);

  return (
    <>
      {isFocus && <FillParent className="z-[9998] bg-black/70"></FillParent>}
      <form
        onSubmit={handleSearch}
        className={cn('relative flex h-full w-full gap-2', {
          'z-[9999]': isFocus,
        })}
      >
        <div ref={containerInputRef} className="relative flex-1">
          <Input
            ref={inputRef}
            placeholder="Find definition for..."
            className="border-2 border-slate-300 bg-slate-200 placeholder:text-slate-400 focus-visible:ring-offset-0"
          />
          {isFocus && (
            <div className="absolute top-12 w-full rounded-lg bg-white">
              <div className="flex items-center justify-between border-b border-solid border-gray-200 px-[32px] py-[16px] pb-2 text-xs last:border-b-0">
                <div className="font-semibold text-slate-400">
                  RECENT SEARCH
                </div>
                {!!history.length && (
                  <div
                    onClick={onRemoveAll}
                    className="font-dinRound text-red-700 hover:cursor-pointer"
                  >
                    Remove all
                  </div>
                )}
              </div>
              {!!history.length && (
                <div className="max-h-[500px] overflow-auto">
                  {history?.map(history => (
                    <div
                      onClick={onClickWord.bind(null, history)}
                      className=" border-b border-solid border-gray-200 px-[32px]  py-[16px] text-sm text-slate-800 last:border-b-0 hover:cursor-pointer hover:bg-slate-100 hover:last:rounded-b-lg"
                    >
                      {history}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <Button className="text-sm" type="submit">
          Search
        </Button>
      </form>
    </>
  );
}
