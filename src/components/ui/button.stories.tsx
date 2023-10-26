import { Button } from './button';
import type { Story } from '@ladle/react';
import '@/index.css';
export const ButtonStory: Story = () => (
  <div className="flex gap-4">
    <Button variant={'default'} size={'lg'}>
      Default
    </Button>
    <Button variant={'destructive'} size={'lg'}>
      Destroy
    </Button>
    <Button variant={'link'} size={'lg'}>
      Link
    </Button>
    <Button variant={'link'}>
      Link
    </Button>
    <Button variant={'outline'} size={'lg'}>
      Outline
    </Button>
    <Button
      color='pink'
    >
      Custom color
    </Button>
  </div>
);
ButtonStory.storyName = 'Default';
