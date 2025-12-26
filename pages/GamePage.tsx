import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES } from '../constants';
import AdSenseUnit from '../components/AdSenseUnit';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); 
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setIframeKey(prev => prev + 1);

    // Keyboard 'F' for Fullscreen listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

  if (!game) {
    return <div className="text-center py-20 text-white">Game not found</div>;
  }

  const toggleFullscreen = () => {
    const elem = document.documentElement; // Requested full screen on document
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.log(err);
        });
        setIsFullscreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        setIsFullscreen(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const relatedGames = GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 6);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
    e.currentTarget.src = `https://tse4.mm.bing.net/th?q=${encodeURIComponent(title + ' game')}&w=100&h=100&c=7&rs=1&p=0`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
            
            {/* Top Ad Unit - High RPM Placement */}
            <AdSenseUnit slot="7766554433" style={{ marginBottom: '20px' }} />

            {/* Fullscreen Controls */}
            <div className="flex flex-col items-center mb-4">
              <button 
                onClick={toggleFullscreen} 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 mb-4"
              >
                <span className="text-xl">⛶</span> Go Full Screen (Press F)
              </button>
              
              <div className="w-full text-center text-white bg-blue-800 p-2 rounded animate-pulse font-medium">
                Press F for the best fullscreen experience on Chromebook!
              </div>
            </div>

            <div className="bg-gaming-800 rounded-xl p-2 md:p-4 mb-4 shadow-2xl relative">
                <div id="game-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gaming-900 z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaming-accent mb-4"></div>
                            <span className="text-gaming-accent font-bold animate-pulse">Loading {game.title}...</span>
                        </div>
                    )}
                    
                    <iframe
                        key={iframeKey}
                        ref={iframeRef}
                        src={game.url}
                        title={game.title}
                        className="game-frame relative z-0"
                        allowFullScreen
                        allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                        onLoad={handleIframeLoad}
                    ></iframe>

                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                         <button 
                            onClick={handleRetry}
                            className="bg-gaming-900/80 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur text-xs font-bold transition-colors"
                        >
                            ↻ Retry
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Ad Unit - Post-Game Engagement */}
            <AdSenseUnit slot="9988776655" style={{ marginTop: '20px', marginBottom: '20px' }} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white">{game.title}</h1>
                    <div className="flex gap-2 text-sm text-gray-400 mt-1">
                        <span className="bg-gaming-700 px-2 py-0.5 rounded text-xs uppercase">{game.category}</span>
                        <span>•</span>
                        <span>{game.plays.toLocaleString()} Plays</span>
                    </div>
                </div>
                <div className="flex gap-2">
                     <button className="bg-gaming-700 hover:bg-gaming-neon hover:text-black transition-colors px-6 py-2 rounded-full font-bold flex items-center gap-2">
                        👍 Like
                     </button>
                </div>
            </div>

            <div className="bg-gaming-800 rounded-xl p-6 mb-8 border border-gaming-700/50">
                <h3 className="font-bold text-lg mb-2 text-gaming-accent">About this Game</h3>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                        <span key={tag} className="bg-gaming-900 border border-gaming-700 px-3 py-1 rounded-full text-xs text-gray-300">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Strategy Text */}
            <div className="strategy mt-8 text-gray-300 p-4 bg-gray-800 rounded-lg shadow-inner border-l-4 border-gaming-accent">
                This is the flagship station: Unblocked Games 2025. This site serves as your primary gateway to digital freedom under strict network restrictions. We utilize the latest mirror technology and proxy scripts to ensure that no matter how updated the school firewall gets, you can still access your favorite titles. As the core hub, it hosts the widest variety of categories, including Action, Shooting, Racing, and Puzzle games.
                <br /><br />
                Feature: We feature a vibrant community rating system, so only the truly fun games make the cut. If you find a game blocked elsewhere, try here first. Our servers have been upgraded for 2025 to provide lightning-fast load times. Whether you have two minutes or an hour, this is your most reliable partner for relaxing after a stressful exam.
            </div>

            {/* Internal Links Block */}
            <div className="other-games mt-8 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">More Unblocked Games 2025</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-none">
                    <li className="mb-1"><a href="https://snakegame.cfd" className="text-blue-400 hover:text-blue-300 transition-colors">Play Snake Game Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://playzero2025.sbs" className="text-blue-400 hover:text-blue-300 transition-colors">Play Zero Lag Games Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://freegames2025.sbs" className="text-blue-400 hover:text-blue-300 transition-colors">Play Free Games Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://nodownload2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play No Download Games Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://unblocked2025.cfd" className="text-blue-400 hover:text-blue-300 transition-colors">Play Unblocked Games 2025 (Main)</a></li>
                    <li className="mb-1"><a href="https://unblocked2025.sbs" className="text-blue-400 hover:text-blue-300 transition-colors">Play Best Unblocked Games 2025</a></li>
                    <li className="mb-1"><a href="https://promax.it.com" className="text-blue-400 hover:text-blue-300 transition-colors">Play ProMax Games Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://retrobowl2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play Retro Bowl Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://1v1lol2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play 1v1.LOL Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://drift2025.site" className="text-blue-400 hover:text-blue-300 transition-colors">Play Drift Hunters Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://slope2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play Slope Game Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://gd2025.site" className="text-blue-400 hover:text-blue-300 transition-colors">Play Geometry Dash Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://motox3m2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play Moto X3M Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://surfers2025.site" className="text-blue-400 hover:text-blue-300 transition-colors">Play Subway Surfers Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://run32025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play Run 3 Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://fireboy2025.site" className="text-blue-400 hover:text-blue-300 transition-colors">Play Fireboy & Watergirl Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://paperio2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play Paper.io Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://driftbest2025.site" className="text-blue-400 hover:text-blue-300 transition-colors">Play Drift Hunters MAX Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://gd-full2025.site" className="text-blue-400 hover:text-blue-300 transition-colors">Play Geometry Dash Full Unblocked 2025</a></li>
                    <li className="mb-1"><a href="https://subway2025.online" className="text-blue-400 hover:text-blue-300 transition-colors">Play Subway Surfers World Unblocked 2025</a></li>
                </ul>
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
            <AdSenseUnit slot="5544332211" format="rectangle" style={{ height: '300px' }} />
            
            <div className="bg-gaming-800 rounded-xl p-4 border border-gaming-700/50">
                <h3 className="font-bold text-lg mb-4 text-gaming-accent flex items-center gap-2">
                    <span>🎮</span> Related Games
                </h3>
                <div className="flex flex-col gap-3">
                    {relatedGames.map(g => (
                        <Link key={g.id} to={`/game/${g.id}`} className="flex gap-3 group bg-gaming-900/50 p-2 rounded-lg hover:bg-gaming-700 transition-colors">
                            <img 
                                src={g.thumbnail} 
                                className="w-16 h-16 rounded-md object-cover" 
                                alt={g.title} 
                                onError={(e) => handleImageError(e, g.title)}
                            />
                            <div className="flex flex-col justify-center">
                                <h4 className="font-bold text-sm text-gray-200 group-hover:text-white line-clamp-1">{g.title}</h4>
                                <span className="text-xs text-gaming-accent">{g.category}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;