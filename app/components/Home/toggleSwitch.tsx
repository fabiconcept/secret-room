import React, { useState } from 'react';
import { FaSliders, FaVolumeHigh, FaVolumeXmark, FaCircleDot, FaEye, FaGripLines, FaPlay, FaHouseChimneyCrack } from 'react-icons/fa6';

// Define the types based on the interfaces in the context
type SoundControl = {
    volume: number;
    isMuted: boolean;
};

interface SettingState {
    glitchEffect: boolean;
    buttonSound: SoundControl;
    crankSound: SoundControl;
    typingSound: SoundControl;
    messageSound: SoundControl;
    soundEffect: SoundControl;
    otherUISound: SoundControl;
    glitchSound: SoundControl;
    backgroundMatrix: {
        color: string;
        opacity: number;
    };
}

// Standalone Settings component
export default function Settings() {
    // Initial state matching the SettingState interface
    const [settings, setSettings] = useState<SettingState>({
        glitchEffect: false,
        buttonSound: { volume: 0.5, isMuted: false },
        crankSound: { volume: 0.6, isMuted: false },
        typingSound: { volume: 0.4, isMuted: false },
        messageSound: { volume: 0.7, isMuted: false },
        soundEffect: { volume: 0.5, isMuted: false },
        otherUISound: { volume: 0.5, isMuted: false },
        glitchSound: { volume: 0.5, isMuted: false },
        backgroundMatrix: { color: '#00ff00', opacity: 0.3 }
    });

    const [activeTab, setActiveTab] = useState('sound');

    // Methods implementation matching SettingMethods interface
    const toggleGlitchEffect = () => {
        setSettings(prev => ({ ...prev, glitchEffect: !prev.glitchEffect }));
    };

    const setButtonSound = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, buttonSound: sound }));
    };

    const setCrankSound = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, crankSound: sound }));
    };

    const setTypingSound = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, typingSound: sound }));
    };

    const setMessageSound = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, messageSound: sound }));
    };

    const setSoundEffect = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, soundEffect: sound }));
    };

    const setOtherUISound = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, otherUISound: sound }));
    };

    const setGlitchSound = (sound: SoundControl) => {
        setSettings(prev => ({ ...prev, glitchSound: sound }));
    };

    const setBackgroundMatrix = (matrix: { color: string; opacity: number }) => {
        setSettings(prev => ({ ...prev, backgroundMatrix: matrix }));
    };

    // Helper for toggling mute for a sound control
    const toggleMute = (controlName: keyof SettingState) => {
        const control = settings[controlName] as SoundControl;
        if (!control || typeof control !== 'object') return;

        setSettings(prev => ({
            ...prev,
            [controlName]: {
                ...control,
                isMuted: !control.isMuted
            }
        }));
    };

    // Helper for updating volume for a sound control
    const updateVolume = (controlName: keyof SettingState, volume: number) => {
        const control = settings[controlName] as SoundControl;
        if (!control || typeof control !== 'object') return;

        setSettings(prev => ({
            ...prev,
            [controlName]: {
                ...control,
                volume: volume
            }
        }));
    };

    // Render a sound control slider with mute toggle
    const renderSoundControl = (label: string, controlName: keyof SettingState) => {
        const control = settings[controlName] as SoundControl;
        if (!control || typeof control !== 'object') return null;

        return (
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{label}</span>
                    <button
                        onClick={() => toggleMute(controlName)}
                        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        {control.isMuted ?
                            <FaVolumeXmark size={16} className="text-red-500" /> :
                            <FaVolumeHigh size={16} className="text-green-500" />
                        }
                    </button>
                </div>
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={control.volume}
                        disabled={control.isMuted}
                        onChange={(e) => updateVolume(controlName, parseFloat(e.target.value))}
                        className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${control.isMuted ? 'opacity-50' : ''}`}
                    />
                    <span className="text-xs w-8 text-right">
                        {Math.round(control.volume * 100)}%
                    </span>
                </div>
            </div>
        );
    };

    // Render the sound settings tab
    const renderSoundSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaVolumeHigh size={18} />
                Sound Settings
            </h3>

            <div className="space-y-4">
                {renderSoundControl('Button Sound', 'buttonSound')}
                {renderSoundControl('Crank Sound', 'crankSound')}
                {renderSoundControl('Typing Sound', 'typingSound')}
                {renderSoundControl('Message Sound', 'messageSound')}
                {renderSoundControl('Sound Effects', 'soundEffect')}
                {renderSoundControl('UI Sounds', 'otherUISound')}
                {renderSoundControl('Glitch Sound', 'glitchSound')}
            </div>
        </div>
    );

    // Render the visual settings tab
    const renderVisualSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaEye size={18} />
                Visual Settings
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Glitch Effect</span>
                    <button
                        onClick={toggleGlitchEffect}
                        className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${settings.glitchEffect ? 'bg-green-500 justify-end' : 'bg-gray-600 justify-start'}`}
                    >
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </button>
                </div>

                <div className="space-y-2">
                    <span className="text-sm font-medium">Matrix Background Color</span>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={settings.backgroundMatrix.color}
                            onChange={(e) => setBackgroundMatrix({
                                ...settings.backgroundMatrix,
                                color: e.target.value
                            })}
                            className="w-8 h-8 rounded cursor-pointer border-none"
                        />
                        <span className="text-xs">{settings.backgroundMatrix.color}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Matrix Opacity</span>
                        <span className="text-xs">{Math.round(settings.backgroundMatrix.opacity * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={settings.backgroundMatrix.opacity}
                        onChange={(e) => setBackgroundMatrix({
                            ...settings.backgroundMatrix,
                            opacity: parseFloat(e.target.value)
                        })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );

    // Render the presets tab
    const renderPresets = () => {
        const presets = [
            {
                name: "Default",
                icon: <FaGripLines size={16} />,
                description: "Standard balanced settings",
                apply: () => {
                    setSettings({
                        glitchEffect: false,
                        buttonSound: { volume: 0.5, isMuted: false },
                        crankSound: { volume: 0.6, isMuted: false },
                        typingSound: { volume: 0.4, isMuted: false },
                        messageSound: { volume: 0.7, isMuted: false },
                        soundEffect: { volume: 0.5, isMuted: false },
                        otherUISound: { volume: 0.5, isMuted: false },
                        glitchSound: { volume: 0.5, isMuted: false },
                        backgroundMatrix: { color: '#00ff00', opacity: 0.3 }
                    });
                }
            },
            {
                name: "Cyberpunk",
                icon: <FaHouseChimneyCrack size={16} />,
                description: "Heavy on visual and audio effects",
                apply: () => {
                    setSettings({
                        glitchEffect: true,
                        buttonSound: { volume: 0.7, isMuted: false },
                        crankSound: { volume: 0.8, isMuted: false },
                        typingSound: { volume: 0.6, isMuted: false },
                        messageSound: { volume: 0.9, isMuted: false },
                        soundEffect: { volume: 0.8, isMuted: false },
                        otherUISound: { volume: 0.7, isMuted: false },
                        glitchSound: { volume: 0.8, isMuted: false },
                        backgroundMatrix: { color: '#ff00ff', opacity: 0.5 }
                    });
                }
            },
            {
                name: "Minimalist",
                icon: <FaCircleDot size={16} />,
                description: "Minimal effects and sounds",
                apply: () => {
                    setSettings({
                        glitchEffect: false,
                        buttonSound: { volume: 0.2, isMuted: false },
                        crankSound: { volume: 0.3, isMuted: false },
                        typingSound: { volume: 0.2, isMuted: false },
                        messageSound: { volume: 0.4, isMuted: false },
                        soundEffect: { volume: 0.2, isMuted: false },
                        otherUISound: { volume: 0.2, isMuted: false },
                        glitchSound: { volume: 0, isMuted: true },
                        backgroundMatrix: { color: '#aaffaa', opacity: 0.1 }
                    });
                }
            },
            {
                name: "Silent Mode",
                icon: <FaVolumeXmark size={16} />,
                description: "All sounds muted",
                apply: () => {
                    setSettings(prev => ({
                        ...prev,
                        buttonSound: { ...prev.buttonSound, isMuted: true },
                        crankSound: { ...prev.crankSound, isMuted: true },
                        typingSound: { ...prev.typingSound, isMuted: true },
                        messageSound: { ...prev.messageSound, isMuted: true },
                        soundEffect: { ...prev.soundEffect, isMuted: true },
                        otherUISound: { ...prev.otherUISound, isMuted: true },
                        glitchSound: { ...prev.glitchSound, isMuted: true },
                    }));
                }
            }
        ];

        return (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaPlay size={18} />
                    Setting Presets
                </h3>

                <div className="grid grid-cols-1 gap-3">
                    {presets.map((preset, index) => (
                        <button
                            key={index}
                            onClick={preset.apply}
                            className="text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-gray-700 rounded">
                                    {preset.icon}
                                </div>
                                <span className="font-medium">{preset.name}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{preset.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-900 text-white rounded-xl overflow-hidden max-w-md w-full shadow-lg">
            {/* Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <FaSliders size={20} />
                    Settings
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
                <button
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'sound' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('sound')}
                >
                    Sound
                </button>
                <button
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'visual' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('visual')}
                >
                    Visual
                </button>
                <button
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'presets' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('presets')}
                >
                    Presets
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {activeTab === 'sound' && renderSoundSettings()}
                {activeTab === 'visual' && renderVisualSettings()}
                {activeTab === 'presets' && renderPresets()}
            </div>

            {/* Footer */}
            <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
                    onClick={() => console.log('Settings saved:', settings)}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}