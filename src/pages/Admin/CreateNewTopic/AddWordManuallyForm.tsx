import { Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FloatingButton } from '@/components/ui/floating-button';
import { LoadingButton } from '@/components/ui/loading-button';

import { WordList } from '../components/WordList';
import { columns } from '../components/columns';

interface SelectedWord {
  id: number;
  word: string;
}

interface AddWordManuallyFormProps {
  onSubmit: (wordIds: string[]) => Promise<void>;
  isLoading: boolean;
  canSubmit: boolean;
  onRemove?: (word: string) => void;
  onAdd?: (word: string) => void;
  selectedWord: string[];
}

export function AddWordManuallyForm({
  onSubmit,
  isLoading,
  canSubmit,
  selectedWord,
  onRemove: handleRemoveValue,
  onAdd: handleSelectValue,
}: AddWordManuallyFormProps) {
  function handleClick(item: string) {
    if (hasBeenSelected(item)) {
      handleRemoveValue?.(item);
    } else {
      handleSelectValue?.(item);
    }
  }

  function hasBeenSelected(value: string) {
    return selectedWord.some(v => v === value);
  }

  function handleSubmit() {
    void onSubmit(selectedWord);
  }

  return (
    <div className="w-full gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <FloatingButton className="z-10 items-center justify-center gap-1">
            <Plus size={14} />
            Add word{' '}
          </FloatingButton>
        </DialogTrigger>
        <DialogContent className="h-[80%] overflow-y-scroll rounded-lg">
          <WordList
            columns={[
              ...columns,
              {
                id: 'actions',
                size: 10,
                header: 'Actions',
                cell: ({ row }) => {
                  return (
                    <Button
                      variant={'secondary'}
                      onClick={() => {
                        handleClick(row.original.word);
                      }}
                    >
                      {hasBeenSelected(row.original.word)
                        ? 'Remove'
                        : 'Add'}
                    </Button>
                  );
                },
              },
            ]}
          />
        </DialogContent>
      </Dialog>

      {selectedWord.length <= 0 ? (
        <div className="text-muted-foreground">
          No word selected. Click 'Add word +' button to begin.
        </div>
      ) : (
        <div className="text-muted-foreground">
          Selected word (click to remove)
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
        {selectedWord.map(item => (
          <Badge
            onClick={() => handleRemoveValue?.(item)}
            variant={'outline'}
            key={item}
            className="text-md flex min-w-[70px] cursor-pointer justify-center font-normal transition-all hover:bg-destructive hover:text-white"
          >
            {item}
          </Badge>
        ))}
      </div>

      <LoadingButton
        disabled={!canSubmit}
        isLoading={isLoading}
        onClick={handleSubmit}
        className="mt-6"
        type="submit"
      >
        Submit
      </LoadingButton>
    </div>
  );
}
