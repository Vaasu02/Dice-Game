const express = require('express');
const router = express.Router();
const { rollDice, verifyRoll, getBalance } = require('../controllers/dice.controller');

router.post('/roll-dice', rollDice);
router.get('/verify-roll', verifyRoll);
router.get('/balance', getBalance);

module.exports = router; 