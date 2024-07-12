import type { FC } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

import { Draggable } from './drag-and-drop/Drag';
import { Droppable } from './drag-and-drop/Drop';
import { DndItem } from './drag-and-drop/ItemType';
import { ItemTypes } from './drag-and-drop/ItemTypes';

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

const question = {
  title: 'Drag and Drop',
  description: 'Drag the words to the correct boxes.',
  content: '{0} {1} {2} {3} {4} {5} {6}',
  correctOrder: ['A', 'B', 'I', 'L', 'I', 'T', 'Y'],
};

export const FillInTheBlank: FC = memo(function Container() {
  const [dustbins, setDustbins] = useState<DustbinState[]>(
    Array.from({ length: 9 }).map(() => ({
      accepts: [ItemTypes.ANY],
      lastDroppedItem: null,
    }))
  );

  const [boxes] = useState<BoxState[]>(
    question.correctOrder
      .map((word, index) => ({
        name: word,
        id: index.toString(),
        type: ItemTypes.ANY,
      }))
      .sort(() => Math.random() - 0.5)
  );

  const remainingBox = boxes.filter(
    n => dustbins.find(d => d.lastDroppedItem?.id === n.id) === undefined
  );

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
      question.content.split(' ').map((word, index) => {
        const match = word.match(/{(\d)}/);
        if (match) {
          const boxIndex = parseInt(match[1]);
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
        return (
          <p className="text-2xl font-thin" key={index}>
            {word}
          </p>
        );
      }),
    [dustbins, handleDrop, handleRemoveItem]
  );

  return (
    <div>
      <div className="gap-2">
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        {
          <div className="flex flex-wrap items-center gap-2">
            {renderedContentWithBoxes}
          </div>
        }
      </div>

      <div className="flex gap-4">
        {remainingBox.map(({ name, type, id }) => (
          <Draggable name={name} id={id} type={type} key={id} />
        ))}
      </div>
    </div>
  );
});
