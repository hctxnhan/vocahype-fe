import { create } from 'zustand';

import { createSelectors } from './createSelector';

interface AdminStoreState {
  editingWordId: string | null;
}
interface AdminStoreActions {
  setEditingWordId: (id: string | null) => void;
}

export const useAdminStore = createSelectors(
  create<AdminStoreState & AdminStoreActions>(set => ({
    editingWordId: null,
    setEditingWordId: id => set({ editingWordId: id }),
  }))
);
