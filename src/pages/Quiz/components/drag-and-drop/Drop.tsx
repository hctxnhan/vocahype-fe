import type { FC } from 'react';
import { memo } from 'react';
import { useDrop } from 'react-dnd';

import { DndItem } from './ItemType';

// const style: CSSProperties = {
//   height: '12rem',
//   width: '12rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   color: 'white',
//   padding: '1rem',
//   textAlign: 'center',
//   fontSize: '1rem',
//   lineHeight: 'normal',
//   float: 'left',
// };

export interface DropProps {
  accept: string[];
  item: DndItem | null;
  removeItem?: (item: DndItem) => void;
  onDrop: (item: DndItem) => void;
}

export const Droppable: FC<DropProps> = memo(function Droppable({
  accept,
  item,
  removeItem,
  onDrop,
}) {
  const [_, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      className={`min-h-[30px] h-full w-fit min-w-[60px] max-w-[120px] rounded-sm border-2 border-dashed border-neutral-200 flex justify-center items-center text-2xl font-thin ${
        item !== null ? 'border-primary' : ''
      } px-4 py-1 text-center text-primary`}
      ref={drop}
      data-testid="dustbin"
      onClick={() => {
        if (!item) return;
        removeItem?.(item);
      }}
    >
      {item && <p className={``}>{item.name}</p>}
    </div>
  );
});
