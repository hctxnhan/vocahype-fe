import { useCallback, useEffect } from 'react';

export function useScroll(direction: 'vertical' | 'horizontal') {
  const handleScroll = useCallback(() => {
    console.log(
      window.innerWidth,
      document.documentElement.scrollLeft,
      document.documentElement.offsetWidth
    );
    if (direction === 'vertical')
      return (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      );
    return (
      window.innerWidth + document.documentElement.scrollLeft !==
      document.documentElement.offsetWidth
    );
  }, [direction]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [handleScroll, direction]);
}
