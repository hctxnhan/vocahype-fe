import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface DeleteAccountDialogProps {
  onConfirm?: () => void;
}

export function DeleteAccountDialog({
  onConfirm,
}: DeleteAccountDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure that you want to delete your account?
        </DialogTitle>
      </DialogHeader>
      <div className="flex items-center gap-8">
        <ExclamationTriangleIcon color="red" width={80} height={80} />
        <div>
          Please make sure that you want to delete your account. All progress will be lost. This action is irreversible. Please be careful.
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
