import type { Story } from '@ladle/react';
import '@/index.css';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from './button';
export const DialogStory: Story = () => (
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <div className="flex gap-8">
          <ExclamationTriangleIcon color="red" width={80} height={80} />
          <div>
            Just another confirmation dialog popup library used to confirm user
            intentions on the web app. Just another confirmation dialog popup
            library used to confirm user intentions on the web app.
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant={'destructive'} type="submit">
          Cancel
        </Button>
        <Button variant={'outline'} type="submit">
          Confirm
        </Button>
        <DialogClose>
          <Button>Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
DialogStory.storyName = 'Default';
