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
      ${hidden ? 'bg-gray-700' : ''} border-4 border-gray-800`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!hidden && (
        <span className={`${suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black'}`}>
          {rank} {suit}
        </span>
      )}
    </motion.div>
  );
};

export default Card;
