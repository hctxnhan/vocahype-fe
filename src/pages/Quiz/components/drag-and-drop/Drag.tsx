import type { FC } from 'react';
import { memo } from 'react';
import { useDrag } from 'react-dnd';

import { DndItem } from './ItemType';

export type DragProps = DndItem;

export const Draggable: FC<DragProps> = memo(function Box({ name, type, id }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, type, id },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type, id]
  );

  return (
    <div ref={drag} style={{ opacity }} data-testid="box">
      {name}
    </div>
  );
});
