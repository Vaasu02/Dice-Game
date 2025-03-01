'use client';
import { useEffect, useState } from 'react';
import DiceGame from './DiceGame';

export default function ClientWrapper() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                <div>Loading...</div>
            </div>
        );
    }

    return <DiceGame />;
} 