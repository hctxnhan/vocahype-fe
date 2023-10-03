import { useContext } from 'react';

import { breadcrumbContext } from '../context/breadcrumb.context';

export function useBreadcrumb() {
  return useContext(breadcrumbContext);
}
