import type { Story } from '@ladle/react';
import '@/index.css';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb';

export const BreadcrumbStory: Story = () => (
  <Breadcrumb>
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Home</BreadcrumbItem>
  </Breadcrumb>
);
BreadcrumbStory.storyName = 'Breadcrumb';
