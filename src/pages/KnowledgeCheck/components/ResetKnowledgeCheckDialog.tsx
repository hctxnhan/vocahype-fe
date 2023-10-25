import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface ResetKnowledgeCheckDialogProps {
  onConfirm?: () => void;
}

export function ResetKnowledgeCheckDialog({
  onConfirm,
}: ResetKnowledgeCheckDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure that you want to reset current test?
        </DialogTitle>
      </DialogHeader>
      <div className="flex items-center gap-8">
        <ExclamationTriangleIcon color="red" width={80} height={80} />
        <div>
          Please make sure that you want to reset current test. All progress
          will be lost.
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            className="w-full"
            onClick={onConfirm}
            variant={'destructive'}
          >
            Go ahead
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
