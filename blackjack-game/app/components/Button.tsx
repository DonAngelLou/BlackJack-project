import { motion } from 'framer-motion';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <motion.button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
      whileHover={{ scale: 1.1 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
