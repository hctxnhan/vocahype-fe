import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Searchbar } from '../Searchbar/Searchbar';

import { NavbarItem } from './NavbarItem';

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size={'icon'}
          className="flex items-center gap-2 lg:hidden"
        >
          <MenuIcon width={20} height={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-sm:w-full">
        <div className="vh-flex-column mt-8 gap-4">
          <NavbarItem href="/">Learn</NavbarItem>
          <NavbarItem href="/profile">Profile</NavbarItem>
          <NavbarItem href="/knowledge-check">Knowledge Check</NavbarItem>
          <NavbarItem href="/notifications">Notifications</NavbarItem>
          <Searchbar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
