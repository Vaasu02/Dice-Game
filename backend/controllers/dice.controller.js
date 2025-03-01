const { generateHash, verifyFairness } = require('../utils/provablyFair');

let playerBalance = 1000; // Starting balance of $1000

const rollDice = async (req, res) => {
    try {
        const { betAmount } = req.body;
        
        if (!betAmount || betAmount <= 0) {
            return res.status(400).json({ error: 'Invalid bet amount' });
        }

        // Check if player has enough balance
        if (betAmount > playerBalance) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const { roll, serverSeed, clientSeed, nonce } = generateHash();
        
        // if player won (4,5,6 wins, 1,2,3 loses)
        const won = roll >= 4;
        // Changed payout calculation: 2x bet amount plus original bet for wins
        const payout = won ? betAmount * 3 : 0;  // Changed from betAmount * 2

        // Update balance
        playerBalance -= betAmount; // Deduct bet
        if (won) {
            playerBalance += payout; // Add winnings if won
        }

        res.json({
            success: true,
            roll,
            won,
            payout,
            newBalance: playerBalance,
            serverSeed,
            clientSeed,
            nonce
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const verifyRoll = async (req, res) => {
    try {
        const { serverSeed, clientSeed, nonce } = req.query;
        const result = verifyFairness(serverSeed, clientSeed, nonce);
        
        res.json({
            success: true,
            verified: result
        });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
};

// endpoint to get current balance
const getBalance = async (req, res) => {
    res.json({ balance: playerBalance });
};

module.exports = {
    rollDice,
    verifyRoll,
    getBalance
}; 