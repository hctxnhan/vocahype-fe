import { Button } from './button';
import type { Story } from '@ladle/react';
import '@/index.css';
export const ButtonStory: Story = () => (
  <div className="flex gap-4">
    <Button variant={'default'} size={'xl'}>
      Default
    </Button>
    <Button variant={'destructive'} size={'xl'}>
      Destroy
    </Button>
    <Button variant={'link'} size={'xl'}>
      Link
    </Button>
    <Button variant={'outline'} size={'xl'}>
      Outline
    </Button>
  </div>
);
ButtonStory.storyName = 'Default';
