import { motion } from 'framer-motion';

interface CardProps {
  suit: string;
  rank: string;
  hidden?: boolean;
}

const Card: React.FC<CardProps> = ({ suit, rank, hidden = false }) => {
  return (
    <motion.div
      className={`w-24 h-36 bg-white rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold 
      ${hidden ? 'bg-gray-700' : ''} border-4 border-gray-800 relative overflow-hidden`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!hidden ? (
        <span className={`${suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black'}`}>
          {rank} {suit}
        </span>
      ) : (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-white text-xl">?</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;
