import { ethers } from 'ethers';

export const connectWallet = async () => {
    if (!window.ethereum){
        throw new Error('Please install MetaMask to use this feature');
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        
        return {
            address,
            balance: ethers.utils.formatEther(balance),
            signer
        };
    } catch (error) {
        throw new Error('Failed to connect wallet: ' + error.message);
    }
};

export const getWalletBalance = async (address) => {
    if (!window.ethereum) return null;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
}; 