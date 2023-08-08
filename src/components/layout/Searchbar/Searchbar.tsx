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

  return (
    <>
      {isFocus && <FillParent className="z-[9998] bg-black/70"></FillParent>}
      <form
        onSubmit={handleSearch}
        className={cn('relative flex h-full w-full gap-2', {
          'z-[9999]': isFocus,
        })}
      >
        <Input
          ref={inputRef}
          placeholder="Find definition for..."
          className="placeholder:text-neutral-300"
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
