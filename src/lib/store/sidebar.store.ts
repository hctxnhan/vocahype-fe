import { create } from 'zustand';

import { createSelectors } from './createSelector';

interface SidebarMobileState {
  isOpen: boolean;
}
interface SidebarMobileActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useSidebarMobile = createSelectors(
  create<SidebarMobileState & SidebarMobileActions>(set => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set(state => ({ isOpen: !state.isOpen })),
  }))
);
