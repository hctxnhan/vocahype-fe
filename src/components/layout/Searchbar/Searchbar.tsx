import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/lib/utils/localStorage';
import { cn } from '@/lib/utils/utils';

import { FillParent } from '../FillParent/FillParent';

import { RecentSearch } from './RecentSearch';

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
            className="border-neutral-200 bg-white placeholder:font-normal placeholder:text-neutral-400"
          />
          <div className="absolute top-12 w-full rounded-lg bg-white">
            <RecentSearch
              isOpen={isFocus}
              history={history}
              onRemoveAll={onRemoveAll}
              onClickWord={onClickWord}
            />
          </div>
        </div>
        <Button variant={'outline'} type="submit">
          Search
        </Button>
      </form>
    </>
  );
}
