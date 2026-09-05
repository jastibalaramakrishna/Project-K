import { create } from 'zustand';
import { CameraMode } from '../data/types';

interface UIState {
  sidebarCollapsed: boolean;
  rightPanelOpen: boolean;
  cameraMode: CameraMode;
  currentPage: string;
  showIntro: boolean;
  demoMode: boolean;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  setCameraMode: (mode: CameraMode) => void;
  setCurrentPage: (page: string) => void;
  setShowIntro: (show: boolean) => void;
  toggleDemoMode: () => void;
  loadDemoScenario: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  rightPanelOpen: true,
  cameraMode: 'full',
  currentPage: 'dashboard',
  showIntro: true,
  demoMode: true,
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setShowIntro: (show) => set({ showIntro: show }),
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
  loadDemoScenario: () => set({ demoMode: true }),
}));

// Alias for consistent naming across the codebase
export const useUiStore = useUIStore;
