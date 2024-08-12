import Card from './Card';

interface PlayerProps {
  name: string;
  hand: { suit: string; rank: string; hidden?: boolean }[];
  total: number;
  isDealer?: boolean;
  revealTotal?: boolean; // Add this prop to control the total display
}

const Player: React.FC<PlayerProps> = ({ name, hand, total, isDealer, revealTotal }) => {
  const displayedTotal = isDealer && !revealTotal
    ? hand.filter(card => !card.hidden).reduce((sum, card) => {
        if (['J', 'Q', 'K'].includes(card.rank)) return sum + 10;
        if (card.rank === 'A') return sum + 11;
        return sum + parseInt(card.rank);
      }, 0)
    : total;

  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-white text-2xl">{name}</h2>
      <div className="flex space-x-2">
        {hand.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} hidden={card.hidden} />
        ))}
      </div>
      <span className="text-yellow-300">Total: {displayedTotal}</span>
    </div>
  );
};

export default Player;
