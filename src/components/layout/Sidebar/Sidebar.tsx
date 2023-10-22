import { NavbarItem } from '../Navbar/NavbarItem';

export function Sidebar() {
  return (
    <div className="flex flex-col gap-2 pr-8 max-lg:hidden">
      {/* <NavbarItem href="/">Home</NavbarItem> */}
      <NavbarItem href="/">Learn</NavbarItem>
      <NavbarItem href="/knowledge-check">Knowledge Check</NavbarItem>
      {/* <NavbarItem href="/practice">Practice</NavbarItem> */}
    </div>
  );
}
