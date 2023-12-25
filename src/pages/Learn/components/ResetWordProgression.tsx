import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoadingButton } from '@/components/ui/loading-button';

export interface ResetWordProgressionProps {
  onConfirm?: () => void;
  isMutating: boolean;
}

export function ResetWordProgression({
  onConfirm,
  isMutating,
}: ResetWordProgressionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <LoadingButton
          isLoading={isMutating}
          className="text-xs font-normal text-muted-foreground"
          variant={'link'}
        >
          (Reset)
        </LoadingButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure that you want to change that word progression back to
            'to learn'?
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-8">
          <ExclamationTriangleIcon color="red" width={80} height={80} />
          <div>
            Please make sure that you want to reset current progression of the
            word. All progress with that word will be lost. This action is
            irreversible. Please be careful.
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
    </Dialog>
  );
}
