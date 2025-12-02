import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="group relative bg-gaming-800 rounded-xl overflow-hidden shadow-lg hover:shadow-gaming-accent/40 hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="aspect-square w-full overflow-hidden relative">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {(game.isNew || game.isTrending) && (
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded text-black ${game.isNew ? 'bg-gaming-neon' : 'bg-orange-500'}`}>
            {game.isNew ? 'NEW' : 'HOT'}
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-gaming-accent text-white px-4 py-2 rounded-full font-bold">PLAY NOW</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm md:text-base truncate text-gray-100 group-hover:text-gaming-accent transition-colors">
          {game.title}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400 capitalize">{game.category}</span>
          <div className="flex items-center text-xs text-yellow-400">
             ★ {game.rating}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;