import { Button } from '@/components/ui/button';
import { Searchbar } from '../Searchbar/Searchbar';
import { PersonIcon, BellIcon, GearIcon } from '@radix-ui/react-icons';

export function Navbar() {
  return (
    <div className="flex">
      <div className="w-[300px]">
        <div className="w-fit py-4 pl-8 font-display text-xl font-bold">
          VocaHype
        </div>
      </div>
      <div className="flex flex-1 justify-between gap-8">
        <div className="w-full max-w-[600px] py-4">
          <Searchbar />
        </div>
        <div className="flex items-center gap-6 py-4 text-lg">
          <div>
            Hello, <span className="font-semibold">Nhan</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={'ghost'} size="icon">
              <PersonIcon />
            </Button>
            <Button variant={'ghost'} size="icon">
              <BellIcon />
            </Button>
            <Button variant={'ghost'} size="icon">
              <GearIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
