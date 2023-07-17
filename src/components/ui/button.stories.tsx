import { Button } from './button';
import type { Story } from '@ladle/react';
import '@/index.css';
export const ButtonStory: Story = () => (
  <Button variant={'special'} size={'xl'}>This is button</Button>
);
ButtonStory.storyName = 'Default';
