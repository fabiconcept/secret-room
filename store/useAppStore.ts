import { create } from "zustand";

interface AppStore {
    sideBarExpanded: boolean;
    homeBackgroundFontSize: number;
    homeTextColor: string;
    uiSettings: boolean;
    toggleSideBar: () => void;
    setSideBarExpanded: (expanded: boolean) => void;
    setHomeBackgroundFontSize: (fontSize: number) => void;
    setHomeTextColor: (color: string) => void;
    setUiSettings: (uiSettings: boolean) => void;
}

export const useAppStore = create<AppStore>((set)=>({
    sideBarExpanded: true,
    homeBackgroundFontSize: 16,
    homeTextColor: '#000',
    uiSettings: false,
    toggleSideBar: () => set((state) => ({ sideBarExpanded: !state.sideBarExpanded })),
    setSideBarExpanded: (expanded) => set({ sideBarExpanded: expanded }),
    setHomeBackgroundFontSize: (fontSize) => set({ homeBackgroundFontSize: fontSize }),
    setHomeTextColor: (color) => set({ homeTextColor: color }),
    setUiSettings: (uiSettings) => set({ uiSettings })
}))