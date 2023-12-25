import { resetLearningProgression } from '@/api/profile/profile';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { LoadingButton } from '@/components/ui/loading-button';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';

import { ResetLearningProgressionDialog } from './components/ResetLearningProgressionDialog';

export function ResetLearningProgression() {
  const toast = useToast();
  const { start, isLoading } = useAsyncAction(resetLearningProgression);

  function handleConfirmReset() {
    start([], {
      onSuccess: () => {
        toast.success({ title: 'All learning progress has been reset' });
      },
      onError: () => {
        toast.error({
          title:
            'Something went wrong. All learning progress still remain. Please try again later.',
        });
      },
    });
  }

  return (
    <div className="flex gap-10 max-md:flex-col max-md:gap-4">
      <div className="vh-flex-column w-44 max-md:w-full">
        <label className="font-medium" htmlFor="">
          Reset learning progression
        </label>
        <dl className="text-sm text-foreground/70">
          This action is irreversible. Please be careful.
        </dl>
      </div>
      <div className="flex-1">
        <Dialog>
          <DialogTrigger asChild>
            <LoadingButton
              isLoading={isLoading}
              variant={'destructive'}
              className=""
            >
              Reset my learning progression
            </LoadingButton>
          </DialogTrigger>
          <ResetLearningProgressionDialog onConfirm={handleConfirmReset} />
        </Dialog>
      </div>
    </div>
  );
}
