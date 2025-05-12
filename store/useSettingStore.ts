import { SettingState, soundControl } from '@/types/useSettingStore.interface';
import { create } from 'zustand';
import { getItem, setItem } from '@/utils/localStorage';

const STORAGE_KEY = 'soundsSettings';

const initialState: SettingState = {
    filledFrom: 'default' as const,
    glitchEffect: true,
    soundEffect: { volume: 0.025, isMuted: false },
    buttonSound: { volume: 0.5, isMuted: false },
    crankSound: { volume: 0.5, isMuted: false },
    typingSound: { volume: 0.5, isMuted: false },
    messageSound: { volume: 0.5, isMuted: false },
    glitchSound: { volume: 0.05, isMuted: false },
    otherUISound: { volume: 0.5, isMuted: false },
    backgroundMatrix: {
        color: '10, 255, 10',
        opacity: 0.05
    }
};

type SoundControlKey = keyof Omit<SettingState, 'filledFrom' | 'glitchEffect' | 'backgroundMatrix'>;

const useSettingStore = create<SettingState & {
    initialize: () => void;
    updateSoundControl: (key: SoundControlKey, control: soundControl) => void;
    toggleMute: (key: SoundControlKey) => void;
    updateVolume: (key: SoundControlKey, volume: number) => void;
    setGlitchEffect: (enabled: boolean) => void;
    updateBackgroundMatrix: (color?: string, opacity?: number) => void;
}>((set) => {
    const persistState = (state: SettingState) => {
        if (state.filledFrom === 'local') {
            setItem(STORAGE_KEY, state);
        }
    };

    return {
        ...initialState,

        initialize: () => {
            const savedState = getItem<SettingState>(STORAGE_KEY, initialState);
            const updatedState = { ...savedState, filledFrom: 'local' as const };
            set(updatedState);
        },

        updateSoundControl: (key, control) => {
            set((state) => {
                const newState = { ...state, [key]: control };
                persistState(newState);
                return newState;
            });
        },

        toggleMute: (key) => {
            set((state) => {
                const control = state[key] as soundControl;
                const newState = {
                    ...state,
                    [key]: { ...control, isMuted: !control.isMuted }
                };
                persistState(newState);
                return newState;
            });
        },

        updateVolume: (key, volume) => {
            set((state) => {
                const control = state[key] as soundControl;
                const newState = {
                    ...state,
                    [key]: { ...control, volume }
                };
                persistState(newState);
                return newState;
            });
        },

        setGlitchEffect: (enabled) => {
            set((state) => {
                const newState = { ...state, glitchEffect: enabled };
                persistState(newState);
                return newState;
            });
        },

        updateBackgroundMatrix: (color, opacity) => {
            set((state) => {
                const newState = {
                    ...state,
                    backgroundMatrix: {
                        ...state.backgroundMatrix,
                        ...(color !== undefined && { color }),
                        ...(opacity !== undefined && { opacity })
                    }
                };
                persistState(newState);
                return newState;
            });
        },
    };
});

export default useSettingStore;