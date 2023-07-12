import '@/index.css';
import { Navbar } from '@/layouts/Navbar/Navbar';

import type { StoryDefault, Story } from '@ladle/react';

export default {
  title: 'Layout / Navbar / Container',
} satisfies StoryDefault;

export const NavbarContainer: Story = () => <Navbar />;
