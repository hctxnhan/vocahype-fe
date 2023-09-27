import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
  const [isExact, setIsExact] = useState(false);

  useClickOutside(containerInputRef, isBlur => {
    setIsFocus(!isBlur);
  });
  const [, navigate] = useLocation();

  function search(word: string) {
    const searchParams = new URLSearchParams({
      search: word,
      exact: isExact ? 'true' : 'false',
      'page[offset]': '1',
      'page[limit]': '10',
    });
    navigate(`/words?${searchParams.toString()}`);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      const newHistoryList = [...new Set([query, ...history])];
      setLocalStorageItem('historySearch', newHistoryList);
      setHistory(newHistoryList);
      search(query);
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
      search(word);
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
        className={cn('relative flex h-auto w-full gap-2', {
          'z-[9999]': isFocus,
        })}
      >
        <div ref={containerInputRef} className="relative flex-1">
          <div>
            <Input
              ref={inputRef}
              placeholder="Find definition for..."
              className="border-neutral-200 bg-white font-dinRound font-medium placeholder:font-medium placeholder:text-neutral-400"
            />
            <div className="center absolute right-4 top-1/2 -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Toggle
                      pressed={isExact}
                      onPressedChange={setIsExact}
                      className="uppercase"
                      size={'sm'}
                    >
                      Exact
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text">
                      Toggle this to search for exact matching words only.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
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
