import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES } from '../constants';
import AdSenseUnit from '../components/AdSenseUnit';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); 
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setIframeKey(prev => prev + 1);

    // 全局 F 键全屏监听 - 提升用户留存的关键小细节
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
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
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
        {/* 主内容区 */}
        <div className="lg:col-span-3">
            
            {/* 1. 顶部广告位 - RPM 贡献核心 */}
            <div className="ad-top mt-4 text-center">
                <AdSenseUnit slot="7766554433" format="auto" />
            </div>

            {/* 2. 移动端/Chromebook 适配提示 */}
            <div className="text-center text-white bg-purple-800 p-3 rounded-lg mb-6 max-w-md mx-auto shadow-lg border border-purple-600 font-medium">
              Tip: Rotate to landscape for better experience on mobile/Chromebook!
            </div>

            {/* 3. 优化后的全屏大按钮 */}
            <button 
              onClick={toggleFullscreen} 
              className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-xl mb-6 shadow-lg transform transition-all active:scale-95 hover:scale-105"
            >
              Play Full Screen (Press F - Best Experience!)
            </button>

            {/* 4. 加载提示 */}
            <div className="text-center text-gray-400 mb-4 font-medium animate-pulse">
              Loading game... (Zero lag on 2025 networks)
            </div>

            {/* 游戏播放器区域 */}
            <div className="bg-gaming-800 rounded-xl p-2 md:p-4 mb-4 shadow-2xl relative border border-gaming-700">
                <div id="game-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gaming-900 z-30">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gaming-neon mb-4"></div>
                            <span className="text-gaming-neon font-black tracking-widest uppercase">Connecting...</span>
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

            {/* 5. 底部广告位 - 游戏后参与度 */}
            <div className="ad-bottom mt-8 text-center">
                <AdSenseUnit slot="9988776655" format="auto" />
            </div>

            {/* 游戏信息与攻略 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-8 p-6 bg-gaming-800/80 rounded-xl border border-gaming-700">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{game.title}</h1>
                    <div className="flex gap-3 text-sm text-gray-400 mt-2">
                        <span className="bg-gaming-accent/20 text-gaming-accent border border-gaming-accent/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">{game.category}</span>
                        <span className="flex items-center gap-1">🎮 {game.plays.toLocaleString()} Plays</span>
                    </div>
                </div>
                <div className="flex gap-3">
                     <button className="bg-gaming-accent hover:bg-gaming-neon hover:text-gaming-900 transition-all px-8 py-3 rounded-full font-black text-sm uppercase shadow-lg">
                        👍 Favorite
                     </button>
                </div>
            </div>

            {/* 深度攻略内容区 */}
            <div className="bg-gaming-800 rounded-xl p-8 mb-8 border border-gaming-700/50 shadow-inner">
                <h3 className="font-bold text-xl mb-4 text-gaming-neon flex items-center gap-2">
                    <span className="text-2xl">🏆</span> Strategy & Pro Tips
                </h3>
                <div className="strategy text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Welcome to <strong>Unblocked Games 2025</strong>. As the premier winner station, we provide unrestricted access to <em>{game.title}</em>. Our high-speed mirrors bypass school and office filters, ensuring you stay connected to the best HTML5 entertainment. 
                  </p>
                  <p>
                    <strong>Pro Tip:</strong> To master this game, focus on the timing of your movements. Using the Full Screen mode (Press F) is highly recommended for Chromebook users to eliminate browser distractions and minimize input lag.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                        <span key={tag} className="bg-gaming-900 border border-gaming-700 px-4 py-1.5 rounded-full text-xs text-gray-400">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* SEO 友链矩阵 */}
            <div className="other-games mt-12 bg-gaming-900/50 p-8 rounded-2xl border border-gaming-700/50">
                <h3 className="text-2xl font-black text-white mb-6 border-b border-gaming-700 pb-4 flex items-center gap-3">
                    <span className="text-gaming-neon">🚀</span> More Unblocked 2025 Networks
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-none">
                    <li className="group"><a href="https://snakegame.cfd" className="text-blue-400 group-hover:text-gaming-neon transition-colors">Play Snake Game Unblocked 2025</a></li>
                    <li className="group"><a href="https://unblocked2025.cfd" className="text-blue-400 group-hover:text-gaming-neon transition-colors">Play Unblocked Games 2025 (Primary)</a></li>
                    <li className="group"><a href="https://playzero2025.sbs" className="text-blue-400 group-hover:text-gaming-neon transition-colors">Zero Lag Games Unblocked 2025</a></li>
                    <li className="group"><a href="https://slope2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors">Slope Game Unblocked 2025</a></li>
                    <li className="group"><a href="https://retrobowl2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors">Retro Bowl Unblocked 2025</a></li>
                    <li className="group"><a href="https://1v1lol2025.online" className="text-blue-400 group-hover:text-gaming-neon transition-colors">1v1.LOL Unblocked 2025</a></li>
                </ul>
            </div>
        </div>

        {/* 侧边栏 */}
        <div className="lg:col-span-1 space-y-6 pt-4">
            <AdSenseUnit slot="5544332211" format="rectangle" style={{ height: '300px' }} />
            
            <div className="bg-gaming-800 rounded-xl p-5 border border-gaming-700 shadow-lg">
                <h3 className="font-black text-lg mb-5 text-gaming-neon flex items-center gap-2 uppercase">
                    <span>🔥</span> Trending Now
                </h3>
                <div className="flex flex-col gap-4">
                    {relatedGames.map(g => (
                        <Link key={g.id} to={`/game/${g.id}`} className="flex gap-4 group bg-gaming-900/40 p-2 rounded-xl hover:bg-gaming-700 transition-all border border-transparent hover:border-gaming-neon/30">
                            <img 
                                src={g.thumbnail} 
                                className="w-16 h-16 rounded-lg object-cover shadow-md group-hover:scale-110 transition-transform" 
                                alt={g.title} 
                                onError={(e) => handleImageError(e, g.title)}
                            />
                            <div className="flex flex-col justify-center overflow-hidden">
                                <h4 className="font-bold text-sm text-gray-100 group-hover:text-gaming-neon truncate">{g.title}</h4>
                                <span className="text-[10px] text-gray-500 uppercase font-black mt-1">{g.category}</span>
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