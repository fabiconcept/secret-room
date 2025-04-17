import { useState, useCallback, useEffect } from 'react';
import { downloadHandler } from '..';

export type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

/**
 * Custom hook for handling file downloads
 * @returns {[DownloadStatus, (url: string, customFilename?: string) => Promise<void>]}
 */
export const useFileDownload = (): [
    DownloadStatus,
    (url: string, customFilename?: string) => Promise<void>
] => {
    const [status, setStatus] = useState<DownloadStatus>('idle');

    // Cleanup function to reset status after success/error
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setStatus('idle');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const startDownload = useCallback(async (contentUrl: string, customFilename?: string) => {
        if (!contentUrl) return;

        if (status === 'downloading') return;

        try {
            setStatus('downloading');
            await downloadHandler(contentUrl, customFilename);
            setStatus('success');
        } catch (error) {
            console.error('Download failed:', error);
            setStatus('error');
        }
    }, []);

    return [status, startDownload];
};