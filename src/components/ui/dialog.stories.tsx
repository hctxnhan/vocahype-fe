import type { Story } from '@ladle/react';
import '@/index.css';
import { Dialog } from './dialog';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
export const DialogStory: Story = () => (
  <Dialog
    title="Are you sure you want to reset current progression?"
    isOpen
    handleClose={() => {}}
    cancelButton={{
      title:'Cancel',
      className:'bg-red-100'
    }}
    saveButton={{
      hidden:true,
      title:'Continue'
    }}
  >
    <div className="flex gap-8">
      <ExclamationTriangleIcon color="red" width={80} height={80} />
      <div>
        Just another confirmation dialog popup library used to confirm user
        intentions on the web app. Just another confirmation dialog popup
        library used to confirm user intentions on the web app.
      </div>
    </div>
  </Dialog>
);
DialogStory.storyName = 'Default';

