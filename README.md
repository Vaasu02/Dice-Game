# Fair Dice Game with Web3 Integration

A **provably fair** dice game with **MetaMask** wallet integration, built with **Next.js** and **Express**.

## Features
- 🎲 **Provably Fair Gambling**: Transparent and verifiable dice rolls  
- 🔗 **Web3 Integration**: Connect your MetaMask wallet  
- 📱 **Responsive Design**: Works on desktop and mobile  
- ⚡ **Real-time Balance Updates**: See your balance change instantly  
- 🎨 **Visual Dice**: Animated dice with proper dot patterns  

---

## 🛠 Tech Stack

### Frontend
- ⚛ **Next.js 15**: React framework with server-side rendering  
- 🎨 **Tailwind CSS**: Utility-first CSS framework  
- 🔗 **Ethers.js**: Ethereum wallet integration  
- 🔄 **Axios**: HTTP client for API requests   

### Backend
- 🚀 **Express.js**: Web server framework  
- 🔐 **Crypto**: For provably fair algorithm  
- 🌍 **CORS**: Cross-origin resource sharing  
- 🔑 **Dotenv**: Environment variable management  

---

## 🎲 Game Mechanics

1. **Betting**: Players enter a bet amount  
2. **Rolling**: Click `"Roll Dice"` to generate a random number (1-6)  
3. **Winning**:  
   - 🎉 Roll **4, 5, or 6** → Win (**2x bet amount + original bet**)  
   - ❌ Roll **1, 2, or 3** → Lose (**bet is deducted**)  
4. **Verification**: All rolls can be verified for fairness  

---

## 🔐 Provably Fair System

The game ensures fairness using cryptographic techniques:

1. Server generates a **random seed**  
2. Client seed is combined with the server seed  
3. **SHA-256 hash function** generates a verifiable random number  
4. Players can verify any roll with the provided seeds  

---

## 🚀 Installation

### Prerequisites
- **Node.js 18+** and **npm**
- **MetaMask** browser extension  

### Backend Setup
```sh
# Clone the repository
git clone https://github.com/yourusername/fair-dice-game.git
cd fair-dice-game

# Install backend dependencies
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env

# Start the backend server
npm run dev
```

### Frontend Setup

# Navigate to frontend directory
cd ../frontend

# Install frontend dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:5000" > .env.local

# Start the frontend development server
npm run dev


📌 Usage
Open your browser and go to http://localhost:3000
Connect your MetaMask wallet (optional)
Enter a bet amount
Click "Roll Dice"
See the result and your updated balance


🔗 Web3 Integration
The game integrates with Ethereum wallets via MetaMask:

Connect Wallet: Click the "Connect Wallet" button
View Balance: See your ETH balance
Persistence: Wallet connection persists between sessions

📡 API Endpoints
Endpoint	Method	Description
/api/roll-dice	POST	Roll the dice with a bet amount
/api/verify-roll	GET	Verify a previous roll
/api/balance	GET	Get current player balance

🚀 Future Improvements
 User authentication system
 Transaction history
 Multiple dice games
 Actual cryptocurrency betting
 Leaderboard system
 Sound effects and enhanced animations



