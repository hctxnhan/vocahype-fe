import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

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
      <DialogBody>
        <div className="flex gap-8">
          <ExclamationTriangleIcon color="red" width={80} height={80} />
          <div>
            Please make sure that you want to reset current test. All progress
            will be lost.
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <DialogClose>
          <Button>Cancel</Button>
        </DialogClose>
        <Button onClick={onConfirm} variant={'destructive'} type="submit">
          Go ahead
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
