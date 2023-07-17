import { Children, isValidElement } from 'react';

export function checkChildren(
  children: React.ReactNode,
  childType: (...args: any) => JSX.Element
) {
  return Children.toArray(children).filter(
    child => isValidElement(child) && child.type === childType
  ) as JSX.Element[];
}
