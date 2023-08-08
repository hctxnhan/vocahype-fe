import { createContext, useState } from 'react';

export const breadcrumbContext = createContext<{
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  items: [],
  setItems: () => void {},
});

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<string[]>([]);

  return (
    <breadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </breadcrumbContext.Provider>
  );
}
