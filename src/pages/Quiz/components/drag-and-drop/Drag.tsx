import type { FC } from 'react';
import { memo } from 'react';
import { useDrag } from 'react-dnd';

import { DndItem } from './ItemType';

export type DragProps = DndItem & {
  disabled?: boolean;
};

export const Draggable: FC<DragProps> = memo(function Box({ name, type, id, disabled = false }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, type, id },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      canDrag: () => !disabled,
    }),
    [name, type, id]
  );

  return (
    <div className='overflow-hidden text-lg px-6 py-1 rounded-md bg-primary text-primary-foreground cursor-pointer' ref={drag} style={{ opacity }} data-testid="box">
      {name}
    </div>
  );
});
