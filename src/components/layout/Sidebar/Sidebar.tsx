import { NavbarItem } from '../Navbar/NavbarItem';

export function Sidebar() {
  return (
    <div>
      <div className="sidebar-height fixed top-navbar z-[30] mt-8 flex flex-col gap-2 max-md:hidden">
        {/* <NavbarItem href="/">Home</NavbarItem> */}
        <NavbarItem href="/">Learn</NavbarItem>
        <NavbarItem href="/knowledge-check">Knowledge Check</NavbarItem>
        {/* <NavbarItem href="/practice">Practice</NavbarItem> */}
      </div>
    </div>
  );
}
