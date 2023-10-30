import { SearchIcon } from 'lucide-react';
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
import { TOUR_STEPS } from '@/lib/configs/tour';
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
    if (!word) return;

    const searchParams = new URLSearchParams({
      search: word,
      exact: isExact ? 'true' : 'false',
      'page[offset]': '1',
      'page[limit]': '10',
    });

    setIsFocus(false);
    navigate(`/search?${searchParams.toString()}`);
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

  function onRemoveAll() {
    inputRef.current?.focus();
    removeLocalStorageItem('historySearch');
    setHistory([]);
  }

  function onClickWord(word: string) {
    if (inputRef.current) {
      inputRef.current.value = word;
      search(word);
    }
  }

  useEffect(() => {
    setHistory(getLocalStorageItem<string[]>('historySearch') || []);
  }, []);

  return (
    <>
      {isFocus && (
        <FillParent className="left-1/2 z-[9998] h-screen w-screen -translate-x-1/2 bg-secondary/90"></FillParent>
      )}
      <form
        data-tour={TOUR_STEPS.NAVBAR.SEARCHBAR.INPUT}
        onSubmit={handleSearch}
        className={cn('relative flex h-auto w-full gap-2 max-md:gap-1', {
          'z-[9999]': isFocus,
        })}
      >
        <div ref={containerInputRef} className="relative flex-1">
          <div>
            <Input
              ref={inputRef}
              placeholder="Find definition for..."
              className="font-dinRound"
            />
            <div className="center absolute right-4 top-1/2 -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      pressed={isExact}
                      onPressedChange={setIsExact}
                      className="uppercase"
                      variant={'none'}
                      size={'sm'}
                      type="button"
                      data-tour={TOUR_STEPS.NAVBAR.SEARCHBAR.TOGGLE}
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
          <RecentSearch
            isOpen={isFocus}
            history={history}
            onRemoveAll={onRemoveAll}
            onClickWord={onClickWord}
          />
        </div>
        <Button variant={'outline'} type="submit">
          <p className="max-md:hidden">Search</p>
          <SearchIcon width={20} height={20} className="md:hidden" />
        </Button>
      </form>
    </>
  );
}
