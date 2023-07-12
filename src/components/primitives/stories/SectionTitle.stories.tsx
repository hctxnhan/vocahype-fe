import '@/index.css';
import type { StoryDefault, Story } from '@ladle/react';
import { SectionTitle } from '../SectionTitle';

export default {
  title: 'Component / Primitive / SectionTitle',
} satisfies StoryDefault;

export const SectionTitleDefault: Story = () => (
  <SectionTitle
    title="Knowledge Checking"
    subtitle="We doing some check to estimating your current vocabulary "
  />
);
