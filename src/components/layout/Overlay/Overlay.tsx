import { cn } from '@/lib/utils/utils';
import { FillParent } from '../FillParent/FillParent';

export interface OverlayProps {
  fullScreen?: boolean;
}

export function Overlay() {
  return <FillParent className={cn('bg-black/70')}></FillParent>;
}
