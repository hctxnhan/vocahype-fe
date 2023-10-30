import {
  PersonIcon,
  BellIcon,
  GearIcon,
  ExitIcon,
} from '@radix-ui/react-icons';
import { Link, useLocation } from 'wouter';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logOutUser } from '@/lib/configs/firebaseAuth';
import { TOUR_STEPS } from '@/lib/configs/tour';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { Tour } from '@/pages/Tour/Tour';

import { Searchbar } from '../Searchbar/Searchbar';

import { MobileNavbar } from './MobileNavbar';
import { ToggleThemeButton } from './ToggleThemeButton';

export function Navbar() {
  const [_, navigate] = useLocation();
  const toast = useToast('Log out');

  const menuConfig = [
    {
      label: 'Profile',
      icon: <PersonIcon width={16} height={16} />,
      action: () => {
        navigate('/profile');
      },
    },
    { label: 'Setting', icon: <GearIcon width={16} height={16} /> },
  ];

  const { start } = useAsyncAction<typeof logOutUser>(logOutUser, {
    onSuccess: () => {
      toast.success({
        msg: 'Successfully log out',
      });
      navigate('/');
    },
    onError: error => {
      toast.error({
        msg: error.message,
      });
    },
  });

  return (
    <div className="navbar-height container fixed left-0 right-0 top-0 z-50 flex w-full items-center backdrop-blur max-lg:justify-between">
      <div className="w-sidebar max-lg:w-fit">
        <Link
          href="/"
          className="mr-4 flex w-sidebar items-center gap-2 font-display text-xl font-bold max-lg:pl-0 max-sm:w-fit"
        >
          VocaHype
        </Link>
      </div>
      <div className="ml-6 flex flex-1 justify-between gap-8 max-md:hidden">
        <div className="w-full max-w-[600px]">
          <Searchbar />
        </div>
        <div className="flex items-center gap-6 text-lg">
          <div className="flex items-center gap-2">
            <Tour />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  size="icon"
                  data-tour={TOUR_STEPS.NAVBAR.PROFILE}
                >
                  <PersonIcon width={20} height={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[224px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuConfig.map(menu => (
                  <DropdownMenuItem key={menu.label} onClick={menu.action}>
                    <div className="flex items-center gap-2">
                      {menu.icon}
                      {menu.label}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    start([]);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ExitIcon width={16} height={16} />
                    Log out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={'ghost'} size="icon">
              <BellIcon width={20} height={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="center ml-2">
        <div className='md:hidden'>
          <Tour />
        </div>
        <ToggleThemeButton />
        <MobileNavbar />
      </div>
    </div>
  );
}
