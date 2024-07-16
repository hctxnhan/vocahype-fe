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

interface MatchingProps {
  question: {
    type: string;
    question: string;
    definitions: {
      text: string;
      word: string;
    }[];
  };
}

export const Matching: FC<MatchingProps> = memo(function Container({
  question,
}: MatchingProps) {
  const [dustbins, setDustbins] = useState<DustbinState[]>(
    Array.from({ length: 9 }).map(() => ({
      accepts: [ItemTypes.ANY],
      lastDroppedItem: null,
    }))
  );

  const [boxes] = useState<BoxState[]>(
    question.definitions.map(({ word }, index) => ({
      name: word,
      type: ItemTypes.ANY,
      id: index.toString(),
    }))
  );

  const remainingBox = boxes.filter(
    n =>
      dustbins.find((d: DustbinSpec) => d.lastDroppedItem?.id === n.id) ===
      undefined
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

  const renderedDefinitionWithBoxes = useMemo(() => {
    if (!question.definitions) return null;
    return question.definitions.map((definition, index) => {
      return (
        <div className="flex items-center" key={definition.word}>
          <p className="flex-1 text-2xl font-thin">{definition.text}</p>
          <div className="flex-1">
            <Droppable
              key={index}
              accept={[ItemTypes.ANY]}
              onDrop={(item: DndItem) => handleDrop(index, item)}
              removeItem={() => handleRemoveItem(index)}
              item={dustbins[index].lastDroppedItem}
            />
          </div>
        </div>
      );
    });
  }, [dustbins, handleDrop, handleRemoveItem]);

  return (
    <div>
      <div className="gap-2">
        <h2>{question.question}</h2>
        {
          <div className="flex flex-col flex-wrap gap-2">
            {renderedDefinitionWithBoxes}
          </div>
        }
      </div>

      <div className="flex gap-4">
        {remainingBox.map(({ name, type, id }, index: number) => (
          <Draggable id={id} name={name} type={type} key={index} />
        ))}
      </div>
    </div>
  );
});
