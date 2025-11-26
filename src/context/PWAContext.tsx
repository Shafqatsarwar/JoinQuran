'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PWAContextType {
    deferredPrompt: any;
    handleInstallClick: () => void;
    isInstallable: boolean;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export const PWAProvider = ({ children }: { children: ReactNode }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        // Register Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').then(function (registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function (err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            // If no prompt is available (already installed or not supported), 
            // we can't force it, but we can log or show a tooltip.
            // For now, we'll just return.
            console.log('Install prompt not available');
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    return (
        <PWAContext.Provider value={{ deferredPrompt, handleInstallClick, isInstallable }}>
            {children}
        </PWAContext.Provider>
    );
};

export const usePWA = () => {
    const context = useContext(PWAContext);
    if (context === undefined) {
        throw new Error('usePWA must be used within a PWAProvider');
    }
    return context;
};
