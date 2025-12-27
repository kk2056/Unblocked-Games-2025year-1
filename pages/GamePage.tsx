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

    // Global 'F' key listener for Fullscreen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

  if (!game) {
    return <div className="text-center py-20 text-white font-bold">Game not found</div>;
  }

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.warn(`Fullscreen error: ${err.message}`);
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
        {/* Main Content Area */}
        <div className="lg:col-span-3">
            
            {/* 1. Top Ad Unit - Maximum RPM Exposure */}
            <div className="ad-top mt-4 text-center">
                <AdSenseUnit slot="7766554433" format="auto" />
            </div>

            {/* 2. Fullscreen UX Suite */}
            <div className="mt-6 mb-6">
              <button 
                onClick={toggleFullscreen} 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mb-4 block mx-auto text-lg shadow-xl transform active:scale-95 transition-all"
              >
                Go Full Screen (Press F for best experience)
              </button>
              
              <div className="text-center text-white bg-blue-800 p-3 rounded-lg mb-6 max-w-md mx-auto shadow-md border border-blue-600 animate-pulse">
                Press F for fullscreen - Perfect for long play on Chromebook! No lag, full immersion.
              </div>
            </div>

            {/* Game Player Container */}
            <div className="bg-gaming-800 rounded-xl p-2 md:p-4 mb-4 shadow-2xl relative border border-gaming-700">
                <div id="game-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gaming-900 z-30">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gaming-neon mb-4"></div>
                            <span className="text-gaming-neon font-black tracking-widest animate-pulse uppercase">Initializing {game.title}...</span>
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
                            className="bg-gaming-900/90 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur text-xs font-bold transition-all border border-gaming-700"
                        >
                            ↻ Reload
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Ad Unit - Post-Play Engagement */}
            <div className="ad-bottom mt-8 text-center">
                <AdSenseUnit slot="9988776655" format="auto" />
            </div>

            {/* Game Info Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-8 p-4 bg-gaming-800/50 rounded-xl">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{game.title}</h1>
                    <div className="flex gap-3 text-sm text-gray-400 mt-2">
                        <span className="bg-gaming-accent/20 text-gaming-accent border border-gaming-accent/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">{game.category}</span>
                        <span className="flex items-center gap-1">👥 {game.plays.toLocaleString()} Plays</span>
                        <span className="text-yellow-400 font-bold">★ {game.rating}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                     <button className="bg-gaming-accent hover:bg-gaming-neon hover:text-gaming-900 transition-all px-8 py-3 rounded-full font-black text-sm uppercase shadow-lg shadow-gaming-accent/20">
                        👍 Like
                     </button>
                </div>
            </div>

            {/* Strategy & Description Content */}
            <div className="bg-gaming-800 rounded-xl p-6 mb-8 border border-gaming-700/50 shadow-inner">
                <h3 className="font-bold text-xl mb-4 text-gaming-neon flex items-center gap-2">
                    <span className="text-2xl">📝</span> Game Strategy & Details
                </h3>
                <div className="strategy text-gray-300 leading-relaxed space-y-4">
                  <p>
                    This is the flagship station: <strong>Unblocked Games 2025</strong>. This site serves as your primary gateway to digital freedom under strict network restrictions. We utilize the latest mirror technology and proxy scripts to ensure that no matter how updated the school firewall gets, you can still access your favorite titles. As the core hub, it hosts the widest variety of categories, including Action, Shooting, Racing, and Puzzle games.
                  </p>
                  <p>
                    <strong>Feature:</strong> We feature a vibrant community rating system, so only the truly fun games make the cut. If you find a game blocked elsewhere, try here first. Our servers have been upgraded for 2025 to provide lightning-fast load times. Whether you have two minutes or an hour, this is your most reliable partner for relaxing after a stressful exam.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                        <span key={tag} className="bg-gaming-900 border border-gaming-700 hover:border-gaming-neon px-4 py-1.5 rounded-full text-xs text-gray-400 transition-colors cursor-pointer">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Internal SEO Link Farm */}
            <div className="other-games mt-12 bg-gaming-900 p-8 rounded-2xl shadow-2xl border border-gaming-700/50">
                <h3 className="text-2xl font-black text-white mb-6 border-b border-gaming-700 pb-4 tracking-tight flex items-center gap-3">
                    <span className="text-gaming-neon">🚀</span> More Unblocked Games 2025
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-none">
                    <li className="group"><a href="https://snakegame.cfd" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Snake Game Unblocked 2025</a></li>
                    <li className="group"><a href="https://playzero2025.sbs" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Zero Lag Games Unblocked 2025</a></li>
                    <li className="group"><a href="https://freegames2025.sbs" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Free Games Unblocked 2025</a></li>
                    <li className="group"><a href="https://nodownload2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play No Download Games Unblocked 2025</a></li>
                    <li className="group"><a href="https://unblocked2025.cfd" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Unblocked Games 2025 (Main)</a></li>
                    <li className="group"><a href="https://unblocked2025.sbs" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Best Unblocked Games 2025</a></li>
                    <li className="group"><a href="https://promax.it.com" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play ProMax Games Unblocked 2025</a></li>
                    <li className="group"><a href="https://retrobowl2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Retro Bowl Unblocked 2025</a></li>
                    <li className="group"><a href="https://1v1lol2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play 1v1.LOL Unblocked 2025</a></li>
                    <li className="group"><a href="https://drift2025.site" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Drift Hunters Unblocked 2025</a></li>
                    <li className="group"><a href="https://slope2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Slope Game Unblocked 2025</a></li>
                    <li className="group"><a href="https://gd2025.site" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Geometry Dash Unblocked 2025</a></li>
                    <li className="group"><a href="https://motox3m2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Moto X3M Unblocked 2025</a></li>
                    <li className="group"><a href="https://surfers2025.site" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Subway Surfers Unblocked 2025</a></li>
                    <li className="group"><a href="https://run32025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Run 3 Unblocked 2025</a></li>
                    <li className="group"><a href="https://fireboy2025.site" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Fireboy & Watergirl Unblocked 2025</a></li>
                    <li className="group"><a href="https://paperio2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Paper.io Unblocked 2025</a></li>
                    <li className="group"><a href="https://driftbest2025.site" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Drift Hunters MAX Unblocked 2025</a></li>
                    <li className="group"><a href="https://gd-full2025.site" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Geometry Dash Full Unblocked 2025</a></li>
                    <li className="group"><a href="https://subway2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors flex items-center gap-2"><span>→</span> Play Subway Surfers World Unblocked 2025</a></li>
                </ul>
            </div>
        </div>

        {/* Sidebar - Recommendations & Ads */}
        <div className="lg:col-span-1 space-y-6 pt-4">
            <AdSenseUnit slot="5544332211" format="rectangle" style={{ height: '300px' }} />
            
            <div className="bg-gaming-800 rounded-xl p-5 border border-gaming-700 shadow-lg">
                <h3 className="font-black text-lg mb-5 text-gaming-neon flex items-center gap-2 uppercase tracking-tighter">
                    <span>🎮</span> Related Titles
                </h3>
                <div className="flex flex-col gap-4">
                    {relatedGames.map(g => (
                        <Link key={g.id} to={`/game/${g.id}`} className="flex gap-4 group bg-gaming-900/40 p-2.5 rounded-xl hover:bg-gaming-700 transition-all border border-transparent hover:border-gaming-neon/30">
                            <img 
                                src={g.thumbnail} 
                                className="w-20 h-20 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform" 
                                alt={g.title} 
                                onError={(e) => handleImageError(e, g.title)}
                            />
                            <div className="flex flex-col justify-center overflow-hidden">
                                <h4 className="font-bold text-sm text-gray-100 group-hover:text-gaming-neon truncate transition-colors">{g.title}</h4>
                                <span className="text-[10px] text-gray-500 uppercase font-black mt-1">{g.category}</span>
                                <span className="text-xs text-yellow-400 mt-0.5">★ {g.rating}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Static Ad Block */}
            <div className="bg-gradient-to-br from-gaming-accent/20 to-blue-600/20 rounded-xl p-1 border border-white/10">
              <AdSenseUnit slot="1234987654" format="rectangle" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;