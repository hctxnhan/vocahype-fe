import type { Story } from '@ladle/react';
import '@/index.css';
import { CarouselNumber } from './carousel-number';
export const CarouselNumberStory: Story = () => (
  <div className="h-full w-full bg-red-400">
    <CarouselNumber current={5} total={10} />
  </div>
);
CarouselNumberStory.storyName = 'Default';
