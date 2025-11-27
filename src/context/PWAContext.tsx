'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PWAContextType = {
    handleInstallClick: () => Promise<void>;
};

const PWAContext = createContext<PWAContextType>({
    handleInstallClick: async () => { },
});

export const PWAProvider = ({ children }: { children: ReactNode }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler as any);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as any);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log('PWA Install choice:', choice.outcome);

        setDeferredPrompt(null);
        (window as any).deferredPrompt = null; // safety fallback
    };

    return (
        <PWAContext.Provider value={{ handleInstallClick }}>
            {children}
        </PWAContext.Provider>
    );
};

export const usePWA = () => useContext(PWAContext);
