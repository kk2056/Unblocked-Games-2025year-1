import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES } from '../constants';
import AdSenseUnit from '../components/AdSenseUnit';
import GameCard from '../components/GameCard';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return <div className="text-center py-20">Game not found</div>;
  }

  const toggleFullscreen = () => {
    const elem = document.getElementById('game-container');
    if (!document.fullscreenElement) {
        elem?.requestFullscreen().catch(err => {
            console.log(err);
        });
        setIsFullscreen(true);
    } else {
        document.exitFullscreen();
        setIsFullscreen(false);
    }
  };

  const relatedGames = GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
            <div className="bg-gaming-800 rounded-xl p-2 md:p-4 mb-4 shadow-2xl">
                <div id="game-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
                    <iframe
                        src={game.url}
                        title={game.title}
                        className="game-frame"
                        allowFullScreen
                        allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                    ></iframe>
                    
                    {/* Controls Overlay (visible on hover/pause) */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button 
                            onClick={toggleFullscreen}
                            className="bg-gaming-900/80 hover:bg-gaming-accent text-white p-2 rounded-lg backdrop-blur"
                        >
                            ⛶ Fullscreen
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white">{game.title}</h1>
                    <div className="flex gap-2 text-sm text-gray-400 mt-1">
                        <span>{game.category}</span>
                        <span>•</span>
                        <span>{game.plays.toLocaleString()} Plays</span>
                    </div>
                </div>
                <div className="flex gap-2">
                     <button className="bg-gaming-700 hover:bg-gaming-600 px-4 py-2 rounded-full font-bold">
                        👍 Like
                     </button>
                     <button className="bg-gaming-700 hover:bg-gaming-600 px-4 py-2 rounded-full font-bold">
                        Report Bug
                     </button>
                </div>
            </div>

            <div className="bg-gaming-800 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                        <span key={tag} className="bg-gaming-900 px-3 py-1 rounded-full text-xs text-gray-400">#{tag}</span>
                    ))}
                </div>
            </div>
            
            <AdSenseUnit slot="1122334455" />

            {/* Comments Placeholder */}
            <div className="bg-gaming-800 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Comments</h3>
                <div className="bg-gaming-900 p-4 rounded text-center text-gray-500">
                    Comments are disabled for unblocked school mode.
                </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
            <AdSenseUnit slot="5544332211" format="rectangle" style={{ height: '250px' }} />
            
            <div className="bg-gaming-800 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-4 text-gaming-accent">Related Games</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    {relatedGames.map(g => (
                        <Link key={g.id} to={`/game/${g.id}`} className="flex gap-3 group">
                            <img src={g.thumbnail} className="w-16 h-16 rounded object-cover group-hover:scale-105 transition-transform" alt="" />
                            <div>
                                <h4 className="font-bold text-sm group-hover:text-gaming-accent transition-colors line-clamp-2">{g.title}</h4>
                                <span className="text-xs text-gray-400">{g.category}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-gaming-accent to-purple-600 rounded-xl p-6 text-center">
                <h3 className="font-bold text-xl mb-2">Unblocked Premium</h3>
                <p className="text-sm mb-4 opacity-90">Get access to 500+ more games without ads.</p>
                <button className="bg-white text-gaming-accent font-bold py-2 px-6 rounded-full w-full">Coming Soon</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;