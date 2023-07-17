import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Searchbar() {
  return (
    <div className="flex h-full w-full gap-2">
      <Input
        placeholder="Find definition for..."
        className="placeholder:text-neutral-300"
      />
      <Button>Search</Button>
    </div>
  );
}
