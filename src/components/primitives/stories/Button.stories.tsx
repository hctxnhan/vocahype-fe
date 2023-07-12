import { Button } from "../Button";
import '@/index.css'
import type { StoryDefault, Story } from "@ladle/react";

export default {
  title: "Component / Primitive / Button",
} satisfies StoryDefault;

export const ButtonOutline: Story = () => <Button>My Button</Button>;
export const ButtonSolid: Story = () => <Button variant={'solid'}>My Button</Button>;