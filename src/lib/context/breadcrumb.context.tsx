import { createContext, useState } from 'react';

export type BreadcrumbItem = string | { label: string; href: string };

export const breadcrumbContext = createContext<{
  items: BreadcrumbItem[];
  setItems: React.Dispatch<React.SetStateAction<BreadcrumbItem[]>>;
}>({
  items: [],
  setItems: () => void {},
});

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return (
    <breadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </breadcrumbContext.Provider>
  );
}
