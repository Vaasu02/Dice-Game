const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const diceRoutes = require('./routes/dice.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', diceRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Fair Dice Game API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 