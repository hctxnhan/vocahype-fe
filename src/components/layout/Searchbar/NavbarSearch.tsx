import { useState } from 'react';
import { useLocation } from 'wouter';

import { useSidebarMobile } from '@/lib/store';

import { Searchbar } from './Searchbar';

export function NavbarSearch() {
  const closeSidebar = useSidebarMobile.use.close();
  const [isExact, setIsExact] = useState(false);
  const [, navigate] = useLocation();

  function search(word: string) {
    if (!word) return;

    const searchParams = new URLSearchParams({
      search: word,
      exact: isExact ? 'true' : 'false',
      'page[offset]': '1',
      'page[limit]': '10',
    });

    closeSidebar();
    navigate(`/search?${searchParams.toString()}`);
  }

  return (
    <Searchbar
      search={search}
      isExact={isExact}
      onToggleExact={setIsExact}
    />
  );
}
