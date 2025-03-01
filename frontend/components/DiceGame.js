'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { connectWallet, getWalletBalance } from '../utils/web3';
import Dice from './Dice';

export default function DiceGame() {
    const [balance, setBalance] = useState(1000);
    const [betAmount, setBetAmount] = useState('');
    const [diceNumber, setDiceNumber] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [message, setMessage] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [ethBalance, setEthBalance] = useState('0');

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/balance`);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const handleConnectWallet = async () => {
        try {
            const { address, balance } = await connectWallet();
            setWalletAddress(address);
            setEthBalance(balance);
            setWalletConnected(true);
            
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletAddress', address);
        } catch (error) {
            console.error('Wallet connection error:', error);
            alert(error.message);
        }
    };

    const handleRoll = async () => {
        if (!betAmount || isRolling) return;

        setIsRolling(true);
        setMessage('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roll-dice`, {
                betAmount: Number(betAmount)
            });

            setDiceNumber(response.data.roll);
            setBalance(response.data.newBalance);
            setMessage(response.data.won ? 'You Won!' : 'You Lost!');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error rolling dice');
        } finally {
            setIsRolling(false);
        }
    };

    useEffect(() => {
        const savedWalletConnected = localStorage.getItem('walletConnected');
        const savedWalletAddress = localStorage.getItem('walletAddress');
        
        if (savedWalletConnected && savedWalletAddress) {
            setWalletConnected(true);
            setWalletAddress(savedWalletAddress);
            getWalletBalance(savedWalletAddress).then(balance => {
                if (balance) setEthBalance(balance);
            });
        }

        fetchBalance();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-8">Dice Game</h1>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Wallet Section */}
                <div className="mb-6 text-center">
                    {!walletConnected ? (
                        <button
                            onClick={handleConnectWallet}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Connect Wallet
                        </button>
                    ) : (
                        <div className="mb-4">
                            <p className="text-sm text-gray-400">Wallet Connected</p>
                            <p className="text-xs text-gray-500 truncate">{walletAddress}</p>
                            <p className="text-sm mt-1">ETH Balance: {Number(ethBalance).toFixed(4)}</p>
                        </div>
                    )}
                </div>

                {/* Game Section */}
                <div className="text-center mb-6">
                    <p className="text-xl">Game Balance: ${balance}</p>
                </div>

                <div className="mb-6">
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        placeholder="Enter bet amount"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>

                {diceNumber && (
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-2">
                            <Dice number={diceNumber} />
                        </div>
                        <div className="text-sm text-gray-400">Rolled: {diceNumber}</div>
                    </div>
                )}

                <button
                    onClick={handleRoll}
                    disabled={isRolling || !betAmount}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    {isRolling ? 'Rolling...' : 'Roll Dice'}
                </button>

                {message && (
                    <div className={`mt-4 text-center ${message.includes('Won') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
