import { motion } from 'framer-motion';

interface BettingControlsProps {
  onChipClick: (amount: number) => void;
  betAmount: number;
  placeBet: () => void;
  resetBet: () => void;
}

const chips = [
  { label: "$10", value: 10, color: "bg-red-500" },
  { label: "$50", value: 50, color: "bg-blue-500" },
  { label: "$100", value: 100, color: "bg-green-500" },
  { label: "$500", value: 500, color: "bg-yellow-500" },
];

const BettingControls: React.FC<BettingControlsProps> = ({ onChipClick, betAmount, placeBet, resetBet }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {chips.map((chip, index) => (
          <motion.div
            key={index}
            className={`w-16 h-16 ${chip.color} rounded-full flex items-center justify-center text-white font-bold cursor-pointer`}
            whileHover={{ scale: 1.2 }}
            onClick={() => onChipClick(chip.value)}
          >
            {chip.label}
          </motion.div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded shadow-lg"
          onClick={placeBet}
        >
          Place Bet: ${betAmount}
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded shadow-lg"
          onClick={resetBet}
        >
          Reset Bet
        </button>
      </div>
    </div>
  );
};

export default BettingControls;
