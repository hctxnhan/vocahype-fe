import { memo, useCallback, useMemo, useState } from 'react';

import { Draggable } from './drag-and-drop/Drag';
import { Droppable } from './drag-and-drop/Drop';
import { DndItem } from './drag-and-drop/ItemType';
import { ItemTypes } from './drag-and-drop/ItemTypes';
import { QuizCompProps, WordScrambleQuiz } from './type';
import { Button } from '@/components/ui/button';

interface DustbinState {
  accepts: string[];
  lastDroppedItem: DndItem | null;
}

type BoxState = DndItem;

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: DndItem | null;
}

export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: DndItem[];
}

// {
//   "type": "word_scramble",
//   "question": "Re-arrange the letters to form a word.",
//   "word": "turn",
//   "result": "untr"
// },

const Container = ({ question, onChoose }: QuizCompProps<WordScrambleQuiz>) => {
  const [dustbins, setDustbins] = useState<DustbinState[]>(
    Array.from({ length: 9 }).map(() => ({
      accepts: [ItemTypes.ANY],
      lastDroppedItem: null,
    }))
  );

  const [boxes] = useState<BoxState[]>(
    question.result.split('').map((letter, index) => ({
      name: letter,
      type: ItemTypes.ANY,
      id: index.toString(),
    }))
  );

  const remainingBox = boxes.filter(
    n => dustbins.find(d => d.lastDroppedItem?.id === n.id) === undefined
  );

  const [showResult, setShowResult] = useState(false);
  const answer = dustbins.map(d => d.lastDroppedItem?.name).join('');

  const canSubmit = answer.length === question.result.length;

  function handleSubmit() {
    if (answer.length !== question.result.length) return;

    const correct =
      question.result === dustbins.map(d => d.lastDroppedItem?.name).join('');

    setShowResult(true);
    onChoose(correct);
  }

  const handleDrop = useCallback((index: number, item: DndItem) => {
    setDustbins(dustbins =>
      dustbins.map((dustbin, i) =>
        i === index
          ? {
              ...dustbin,
              lastDroppedItem: item,
            }
          : dustbin
      )
    );
  }, []);

  const handleRemoveItem = useCallback((boxIndex: number) => {
    setDustbins(dustbins =>
      dustbins.map((dustbin, i) =>
        i === boxIndex
          ? {
              ...dustbin,
              lastDroppedItem: null,
            }
          : dustbin
      )
    );
  }, []);

  const renderedContentWithBoxes = useMemo(
    () =>
      question.word.split('').map((word, index) => {
        if (true) {
          const boxIndex = index;

          return (
            <Droppable
              accept={dustbins[boxIndex].accepts}
              item={dustbins[boxIndex].lastDroppedItem}
              onDrop={item => handleDrop(boxIndex, item)}
              removeItem={() => handleRemoveItem(boxIndex)}
              key={index}
            />
          );
        }
        // return (
        //   <p className="text-2xl font-thin" key={index}>
        //     {word}
        //   </p>
        // );
      }),
    [dustbins, handleDrop, handleRemoveItem]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {renderedContentWithBoxes}
      </div>

      <div className="flex gap-4">
        {remainingBox.map(({ name, type, id }) => (
          <Draggable name={name} id={id} type={type} key={id} />
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || showResult}
        className="mt-6 w-full"
      >
        Submit
      </Button>
    </div>
  );
};

export const FillInBlank = memo(Container);
