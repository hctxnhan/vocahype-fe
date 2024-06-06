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
  onSubmit: (wordIds: number[]) => Promise<void>;
  isLoading: boolean;
  canSubmit: boolean;
  onRemove?: (word: SelectedWord) => void;
  onAdd?: (word: SelectedWord) => void;
  selectedWord: SelectedWord[];
}

export function AddWordManuallyForm({
  onSubmit,
  isLoading,
  canSubmit,
  selectedWord,
  onRemove: handleRemoveValue,
  onAdd: handleSelectValue,
}: AddWordManuallyFormProps) {
  function handleClick(item: SelectedWord) {
    if (hasBeenSelected(item)) {
      handleRemoveValue?.(item);
    } else {
      handleSelectValue?.(item);
    }
  }

  // const handleSelectValue = (value: SelectedWord) => {
  //   setSelectedValue([...selectedValue, value]);
  // };

  // const handleRemoveValue = (value: SelectedWord) => {
  //   setSelectedValue(selectedValue.filter(v => v.id !== value.id));
  // };

  function hasBeenSelected(value: SelectedWord) {
    return selectedWord.some(v => v.id === value.id);
  }

  function handleSubmit() {
    const wordIds = selectedWord.map(item => item.id);
    void onSubmit(wordIds);
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
        <DialogContent className="h-[80%] overflow-scroll">
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
                        handleClick({
                          id: row.original.id,
                          word: row.original.word,
                        });
                      }}
                    >
                      {hasBeenSelected({
                        id: row.original.id,
                        word: row.original.word,
                      })
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
            key={item.id}
            className="text-md flex min-w-[70px] cursor-pointer justify-center font-normal transition-all hover:bg-destructive hover:text-white"
          >
            {item.word}
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
