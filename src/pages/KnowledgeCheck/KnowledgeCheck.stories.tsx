import '@/index.css';
import { KnowledgeCheck as KnowledgeCheckComponent } from './KnowledgeCheck';
import type { StoryDefault, Story } from '@ladle/react';
import { MainLayout } from '@/layouts/MainLayout';

export default {
  title: 'Page / KnowledgeCheck',
} satisfies StoryDefault;

export const KnowledgeCheck: Story = () => (
  <MainLayout>
    <KnowledgeCheckComponent />
  </MainLayout>
);
