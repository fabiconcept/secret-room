import { create } from "zustand";

interface AppStore {
    sideBarExpanded: boolean;
    toggleSideBar: () => void;
}

export const useAppStore = create<AppStore>((set)=>({
    sideBarExpanded: true,
    toggleSideBar: () => set((state) => ({ sideBarExpanded: !state.sideBarExpanded }))
}))