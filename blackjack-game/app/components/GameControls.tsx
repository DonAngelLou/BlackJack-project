interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onHit, onStand, onReset }) => {
  return (
    <div className="flex space-x-4 mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onHit}>
        Hit
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onStand}>
        Stand
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default GameControls;
