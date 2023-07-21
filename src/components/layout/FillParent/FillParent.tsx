import { PropsWithChildren } from 'react';

export function FillParent({ children }: PropsWithChildren) {
  return (
    <div className="center absolute inset-0 overflow-hidden">{children}</div>
  );
}
