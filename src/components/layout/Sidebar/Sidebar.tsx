import { NavbarItem } from '../Navbar/NavbarItem';

export function Sidebar() {
  return (
    <div className="flex flex-col gap-2 pr-8">
      <NavbarItem href='/'>Home</NavbarItem>
      <NavbarItem href='/knowledge-check' selected>Knowledge Check</NavbarItem>
      <NavbarItem href='/learn'>Learn</NavbarItem>
      <NavbarItem href='/practice'>Practice</NavbarItem>
    </div>
  );
}
