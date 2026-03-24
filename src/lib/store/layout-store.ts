/** @format */

import { create } from 'zustand';
import { ReactNode } from 'react';

interface DrawerConfig {
  content: ReactNode;
  width?: number | string;
}

interface LayoutStore {
  isDrawerOpen: boolean;
  drawerConfig: DrawerConfig;
  actions: {
    openDrawer: (config: DrawerConfig) => void;
    closeDrawer: () => void;
  };
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isDrawerOpen: false,
  drawerConfig: {
    content: null,
    width: 600,
  },
  actions: {
    openDrawer: (config) =>
      set({
        isDrawerOpen: true,
        drawerConfig: config,
      }),
    closeDrawer: () =>
      set({
        isDrawerOpen: false,
      }),
  },
}));
