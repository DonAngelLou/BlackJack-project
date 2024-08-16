"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Player from './components/Player';
import GameControls from './components/GameControls';
import BettingControls from './components/BettingControls';

const getRandomCard = () => {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = ranks[Math.floor(Math.random() * ranks.length)]; 
  return { suit, rank };
};

const calculateHandTotal = (hand, revealAll = false) => {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (!card.hidden || revealAll) {
      if (['J', 'Q', 'K'].includes(card.rank)) {
        total += 10;
      } else if (card.rank === 'A') {
        aces += 1;
        total += 11;  // Ace initially counts as 11
      } else {
        total += parseInt(card.rank);
      }
    }
  });

  // Adjust for Aces if total > 21
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
};

export default function Home() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerBalance, setPlayerBalance] = useState(1000); // Starting balance
  const [betAmount, setBetAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [cardsDealt, setCardsDealt] = useState(false);

  const handleChipClick = (amount: number) => {
    if (betAmount + amount <= playerBalance && betAmount + amount >= 0) {
      setBetAmount(betAmount + amount);
    }
  };

  const placeBet = () => {
    if (betAmount === 0) {
      setMessage('Please place a bet!');
      return;
    }
    setPlayerBalance(playerBalance - betAmount);
    setMessage(`Bet placed: ${betAmount}`);
    dealInitialCards();
  };

  const resetBet = () => {
    setBetAmount(0);
  };

  const dealInitialCards = () => {
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([{ ...getRandomCard(), hidden: true }, getRandomCard()]);
    setCardsDealt(true);
  };

  const handleHit = () => {
    if (!gameOver && cardsDealt) {
      const newCard = getRandomCard();
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);
      const total = calculateHandTotal(newHand);
      if (total > 21) {
        handleLose();
      }
    }
  };

  const handleStand = () => {
    if (!gameOver && cardsDealt) {
      let newDealerHand = dealerHand.map(card => ({ ...card, hidden: false }));
      let dealerTotal = calculateHandTotal(newDealerHand, true);

      // Dealer hits until reaching a total of 17 or higher
      while (dealerTotal < 17) {
        const newCard = getRandomCard();
        newDealerHand = [...newDealerHand, newCard];
        dealerTotal = calculateHandTotal(newDealerHand, true);
      }

      setDealerHand(newDealerHand);

      const playerTotal = calculateHandTotal(playerHand);
      dealerTotal = calculateHandTotal(newDealerHand, true);

      if (dealerTotal > 21 || playerTotal > dealerTotal) {
        handleWin();
      } else if (playerTotal < dealerTotal) {
        handleLose();
      } else {
        setMessage('It\'s a tie!');
        setPlayerBalance(playerBalance + betAmount);
        setGameOver(true);
      }
    }
  };

  const handleWin = () => {
    setPlayerBalance(playerBalance + betAmount * 2);
    setMessage('You win!');
    setGameOver(true);
  };

  const handleLose = () => {
    setMessage('Dealer wins!');
    setGameOver(true);
  };

  const handleReset = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setBetAmount(0);
    setMessage('');
    setGameOver(false);
    setCardsDealt(false);
  };

  useEffect(() => {
    const playerTotal = calculateHandTotal(playerHand);
    if (playerTotal > 21) {
      handleLose();
    }
  }, [playerHand]);

  useEffect(() => {
    if (gameOver && dealerHand.some(card => card.hidden)) {
      const newDealerHand = dealerHand.map(card => ({ ...card, hidden: false }));
      setDealerHand(newDealerHand);
    }
  }, [gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-900 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-5xl text-white font-bold">Blackjack</h1>
      <div className="flex space-x-8">
        <Player name="Dealer" hand={dealerHand} total={calculateHandTotal(dealerHand)} />
        <Player name="Player" hand={playerHand} total={calculateHandTotal(playerHand)} />
      </div>
      {!cardsDealt && (
        <BettingControls
          onChipClick={handleChipClick}
          betAmount={betAmount}
          placeBet={placeBet}
          resetBet={resetBet}
        />
      )}
      {cardsDealt && <GameControls onHit={handleHit} onStand={handleStand} onReset={handleReset} />}
      <h2 className="text-3xl text-white mt-4">{message}</h2>
      <h3 className="text-2xl text-yellow-300">Balance: ${playerBalance}</h3>
    </div>
  );
}
