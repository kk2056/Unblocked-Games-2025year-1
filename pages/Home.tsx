
import React from 'react';
import { GAMES } from '../constants';
import GameCard from '../components/GameCard';
import AdSenseUnit from '../components/AdSenseUnit';

const Home: React.FC = () => {
  const mostPlayed = [...GAMES].sort((a, b) => b.plays - a.plays).slice(0, 6);
  const newGames = GAMES.filter(g => g.isNew).slice(0, 6);
  const trending = GAMES.filter(g => g.isTrending).slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden bg-gradient-to-b from-gaming-800 to-gaming-900">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=4')] bg-cover opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gaming-accent to-purple-500">
              100% Free & Unblocked
            </span>
            <br />
            Everywhere 2025
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Access the ultimate collection of unlocked games. Play instantly at school, work, or home. No downloads, no blocks, just fun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button className="bg-gaming-accent hover:bg-violet-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg shadow-gaming-accent/25">
               Play Now
             </button>
             <button className="bg-gaming-700 hover:bg-gaming-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
               Browse All
             </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* Ad Unit 1 */}
        <AdSenseUnit slot="1234567890" style={{ minHeight: '120px' }} />

        {/* Most Played */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-yellow-400">★</span> Most Played
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {mostPlayed.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* New Games */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-gaming-neon">NEW</span> New Games
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {newGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Ad Unit 2 */}
        <AdSenseUnit slot="0987654321" format="fluid" layoutKey="-fb+5w+4e-db+86" />

        {/* Trending */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-red-500">🔥</span> Trending Now
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {trending.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

         {/* SEO Text Block */}
         <section className="mb-12 p-6 bg-gaming-800 rounded-xl text-gray-400 text-sm leading-relaxed">
            <h2 className="text-white font-bold text-lg mb-2">About Unblocked Games 2025</h2>
            <p className="mb-2">
              Welcome to the premier destination for unblocked games 2025 free. Our mission is to provide a safe, secure, and accessible gaming environment for students and employees. We bypass common firewalls using advanced mirroring techniques to ensure you can play your favorite titles like Subway Surfers, 1v1.LOL, and Minecraft Classic anywhere.
            </p>
            <p>
              Unlike other sites, we ensure 100% uptime and legitimate game licenses. Whether you are looking for arcade classics, racing simulators, or brain-teasing puzzles, our catalog is updated daily. Enjoy the freedom of gaming without restrictions.
            </p>
         </section>
      </div>
    </div>
  );
};

export default Home;
