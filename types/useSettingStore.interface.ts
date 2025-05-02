export type soundControl = {
    volume: number;
    isMuted: boolean;
}

export type SoundControlKey = keyof Pick<SettingState, 'buttonSound' | 'crankSound' | 'typingSound' | 'messageSound' | 'soundEffect' | 'otherUISound' | 'glitchSound'>;

export interface SettingState {
    glitchEffect: boolean;
    buttonSound: soundControl;
    crankSound: soundControl;
    typingSound: soundControl;
    messageSound: soundControl;
    soundEffect: soundControl;
    otherUISound: soundControl;
    backgroundMatrix: {
        color: string;
        opacity: number;
    };
    glitchSound: soundControl;
    filledFrom: "default" | "local";
}

interface SettingMethods {
    // general controls
    toggleGlitchEffect: () => void;
    setButtonSound: (sound: soundControl) => void;
    setCrankSound: (sound: soundControl) => void;
    setTypingSound: (sound: soundControl) => void;
    setMessageSound: (sound: soundControl) => void;
    setSoundEffect: (sound: soundControl) => void;
    setOtherUISound: (sound: soundControl) => void;
    setGlitchSound: (sound: soundControl) => void;
    setBackgroundMatrix: (matrix: { color: string; opacity: number }) => void;
    // specific controls
    setGlitchEffect: (glitchEffect: boolean) => void;
    setButtonSoundVolume: (volume: number) => void;
    setCrankSoundVolume: (volume: number) => void;
    setTypingSoundVolume: (volume: number) => void;
    setMessageSoundVolume: (volume: number) => void;
    setSoundEffectVolume: (volume: number) => void;
    setOtherUISoundVolume: (volume: number) => void;
    setGlitchSoundVolume: (volume: number) => void;
    setBackgroundMatrixColor: (color: string) => void;
    setBackgroundMatrixOpacity: (opacity: number) => void;
    // preferences
    setPreferences: (preferences: SettingState) => void;
    setFilledFrom: (filledFrom: "default" | "local") => void;
}

export default interface SettingStore extends SettingState, SettingMethods {}