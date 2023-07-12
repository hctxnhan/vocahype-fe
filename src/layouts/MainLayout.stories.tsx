import '@/index.css';
import { MainLayout as MainLayoutComponent } from './MainLayout';
import type { StoryDefault, Story } from '@ladle/react';

export default {
  title: 'Layout / MainLayout',
} satisfies StoryDefault;

export const MainLayout: Story = () => <MainLayoutComponent />;
