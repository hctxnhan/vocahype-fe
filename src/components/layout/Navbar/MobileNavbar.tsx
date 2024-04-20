import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSidebarMobile } from '@/lib/store';

import { Searchbar } from '../Searchbar/Searchbar';
import { LearningTimeProgress } from '../Sidebar/components/LearningTimeProgress';

import { KnowledgeCheckNavbarItem } from './KnowledgeCheckNavbarItem';
import { NavbarItem } from './NavbarItem';

export function MobileNavbar() {
  const isOpen = useSidebarMobile.use.isOpen();
  const open = useSidebarMobile.use.open();
  const close = useSidebarMobile.use.close();

  return (
    <Sheet open={isOpen} onOpenChange={next => (next ? open() : close())}>
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
            <KnowledgeCheckNavbarItem />
          </SheetClose>
          <SheetClose>
            <NavbarItem href="/exploration">Exploration</NavbarItem>
          </SheetClose>
          <SheetClose>
            <NavbarItem href="/report">Report</NavbarItem>
          </SheetClose>
          {/* <SheetClose>
            <NavbarItem href="/notifications">Notifications</NavbarItem>
          </SheetClose> */}
          <Searchbar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
