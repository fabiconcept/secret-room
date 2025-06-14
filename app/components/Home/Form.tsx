'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { generateServerName, generateEncryptionKey, getUniqueFingerprint } from '@/utils';
import { InputWithShuffle } from './InputWithShuffle';
import { LifespanSlider } from './LifespanSlider';
import Button from './Button';
import clsx from 'clsx';
import { apiService } from '@/utils/services/api.service';
import { CreateServerRequest } from '@/app/types/server.types';
import toast from 'react-hot-toast';
import { setItem } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { wordsCategories } from '@/constants/words';

interface FormState {
    isLoading: boolean;
    error: string | null;
}

const initialState: FormState = {
    isLoading: false,
    error: null
};

export default function Form() {
    const router = useRouter();
    const [placeholderName, setPlaceholderName] = useState('');
    const [serverName, setServerName] = useState('');
    const [encryptionKey, setEncryptionKey] = useState('');
    const [lifespan, setLifespan] = useState(60); // Default 1 hour
    const [state, setState] = useState<FormState>(initialState);
    const randomIndex = Math.floor(Math.random() * wordsCategories.length);

    const handleGenerateNewServerName = useCallback(() => {
        if (state.isLoading) return;

        const newServerName = generateServerName({
            maxLength: 32,
            includeLocation: true,
            category: randomIndex,
            separator: '-'
        });
        setPlaceholderName(newServerName);
        setServerName(newServerName);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (state.isLoading) return;

        if (e.key === 'Tab' && !serverName.trim()) {
            e.preventDefault();
            setServerName(placeholderName);
        }
    }, [serverName, placeholderName]);

    const generateNewKey = useCallback(() => {
        if (state.isLoading) return;

        setEncryptionKey(generateEncryptionKey(48));
    }, []);

    useEffect(() => {
        generateNewKey();
    }, [generateNewKey]);

    useEffect(() => {
        if (serverName !== "") return;
        setPlaceholderName(generateServerName({
            maxLength: 32,
            includeLocation: true,
            category: randomIndex,
            separator: '-'
        }));
    }, [serverName]);

    const serverNameHint = (
        <span className="mt-2 text-sm text-gray-500 italic">
            Suggested: <span data-text={placeholderName} className='glitch'>{placeholderName}</span>
        </span>
    );

    const encryptionKeyHint = (
        <span className="mt-2 text-xs text-gray-500">
            This key will be used to encrypt your server&lsquo;s communications.
        </span>
    );

    const canProceed = serverName.trim() && encryptionKey.trim() && !state.isLoading;

    const createServer = async () => {
        if (!canProceed || state.isLoading) return;

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const fingerprint = await getUniqueFingerprint();

            const request: CreateServerRequest = {
                serverName: serverName.trim(),
                encryptionKey: encryptionKey.trim(),
                lifeSpan: lifespan * 60 * 1000,
                fingerprint
            };

            const response = await apiService.createServer(request);

            const { data, user, token } = response;

            setItem(data.server_id, { ...user, token });
            router.push(`/${data.server_id}`);
        } catch (error) {
            console.error('Error creating server:', error);
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'An error occurred'
            }));
            setState(prev => ({ ...prev, isLoading: false }));

            throw new Error("Failed to create server");
        }
    };

    const handleSubmit = () => {
        const promise = createServer();
        toast.promise(promise, {
            loading: 'Initializing secure server...',
            success: 'Server created successfully! Redirecting to secure room...',
            error: `Failed to create server`
        });
    }

    return (
        <div className='rounded-2xl bg-[#1a1a1a] p-8 sm:w-md w-full border border-gray-500/20'>
            <h1 data-text="Leave this place" className='text-2xl w-[15rem] text-gray-400 glitch font-semibold text-center mx-auto mb-6'>
                Create a Server
            </h1>

            {state.error && (
                <div className="mb-4 p-3 rounded bg-red-900/50 border border-red-500/50 text-red-200 text-sm">
                    {JSON.stringify(state.error)}
                </div>
            )}

            <div className={clsx(
                "space-y-5",
                state.isLoading ? "pointer-events-none opacity-50" : ""
            )}>
                <InputWithShuffle
                    id="server-name"
                    label="Server Name"
                    value={serverName}
                    onChange={setServerName}
                    onShuffle={handleGenerateNewServerName}
                    placeholder={placeholderName}
                    onKeyDown={handleKeyDown}
                    hint={serverNameHint}
                    maxLength={24}
                />

                <InputWithShuffle
                    id="encryption-key"
                    label="Encryption Key"
                    value={encryptionKey}
                    onChange={()=>{}}
                    onShuffle={generateNewKey}
                    disabled
                    placeholder="Click generate to create a secure key"
                    className="font-mono text-sm"
                    hint={encryptionKeyHint}
                />

                <LifespanSlider
                    value={lifespan}
                    onChange={setLifespan}
                />
            </div>

            <div className={clsx(
                'mt-5 grid place-items-center',
                !canProceed && 'opacity-50 pointer-events-none'
            )}>
                <Button
                    text={
                        state.isLoading
                            ? "Creating Server..."
                            : canProceed
                                ? "Start Server"
                                : serverName.trim() === ""
                                    ? "Choose a Server Name"
                                    : "Set an Encryption Key"
                    }
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}