import {
  PersonIcon,
  BellIcon,
  GearIcon,
  ExitIcon,
} from '@radix-ui/react-icons';
import { useLocation } from 'wouter';

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
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { Searchbar } from '../Searchbar/Searchbar';

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
            <Button
              onClick={() => navigate('/profile')}
              variant={'ghost'}
              size="icon"
            >
              <PersonIcon />
            </Button>
            <Button variant={'ghost'} size="icon">
              <BellIcon />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={'ghost'} size="icon">
                  <GearIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[224px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuConfig.map(menu => (
                  <DropdownMenuItem onClick={menu.action}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
