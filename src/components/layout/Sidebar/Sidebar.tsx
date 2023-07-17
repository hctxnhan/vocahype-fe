import { NavbarItem } from '../Navbar/NavbarItem';

export function Sidebar() {
  return (
    <div className='flex flex-col gap-2 pr-8'>
      <NavbarItem>Home</NavbarItem>
      <NavbarItem selected>Knowledge Check</NavbarItem>
      <NavbarItem>Learn</NavbarItem>
      <NavbarItem>Practice</NavbarItem>
    </div>
  );
}
