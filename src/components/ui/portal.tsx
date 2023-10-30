import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends PropsWithChildren {
  selector?: string;
}

export function Portal({ children, selector = '#portal' }: PortalProps) {
  const portalRoot: HTMLDivElement | null = document.querySelector(selector);

  if (!portalRoot) return null;
  
  return createPortal(children, portalRoot);
}
