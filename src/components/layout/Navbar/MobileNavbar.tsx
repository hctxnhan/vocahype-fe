import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Searchbar } from '../Searchbar/Searchbar';
import { LearningTimeProgress } from '../Sidebar/components/LearningTimeProgress';

import { NavbarItem } from './NavbarItem';

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size={'icon'}
          className="flex items-center gap-2 md:hidden"
        >
          <MenuIcon width={20} height={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[min(500px, 100%)] max-sm:w-full max-sm:p-1">
        <div className="vh-flex-column mt-8 gap-4 px-2">
          <LearningTimeProgress />
          <SheetClose>
            <NavbarItem href="/">Learn</NavbarItem>
          </SheetClose>
          <SheetClose>
            <NavbarItem href="/profile">Profile</NavbarItem>
          </SheetClose>
          <SheetClose>
            <NavbarItem href="/knowledge-check">Knowledge Check</NavbarItem>
          </SheetClose>
          <SheetClose>
            <NavbarItem href="/notifications">Notifications</NavbarItem>
          </SheetClose>

          <Searchbar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
