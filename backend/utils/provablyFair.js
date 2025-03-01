const crypto = require('crypto');

const generateServerSeed = () => {
    return crypto.randomBytes(32).toString('hex');
};

const generateHash = () => {
    const serverSeed = generateServerSeed();
    const clientSeed = 'default_client_seed'; //default client seed
    const nonce = 1; //default nonce

    const combinedString = `${serverSeed}-${clientSeed}-${nonce}`;
    const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
    
    // Use first 4 bytes of hash to generate number between 1-6
    const decimal = parseInt(hash.slice(0, 8), 16);
    const roll = (decimal % 6) + 1;

    return {
        roll,
        serverSeed,
        clientSeed,
        nonce
    };
};

const verifyFairness = (serverSeed, clientSeed, nonce) => {
    const combinedString = `${serverSeed}-${clientSeed}-${nonce}`;
    const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
    
    const decimal = parseInt(hash.slice(0, 8), 16);
    const roll = (decimal % 6) + 1;

    return roll;
};

module.exports = {
    generateHash,
    verifyFairness
}; 