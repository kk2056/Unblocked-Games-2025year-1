import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GAMES } from '../constants';

const Layout: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Simple search redirect logic for demo purposes could be improved
  const filteredGames = search.length > 2 
    ? GAMES.filter(g => g.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="bg-gaming-800/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gaming-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-gaming-accent to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                U
              </div>
              <span className="text-xl font-black tracking-tight hidden md:block">
                Unblocked<span className="text-gaming-accent">2025</span>
              </span>
            </Link>

            <div className="relative flex-1 max-w-lg hidden md:block">
              <input
                type="text"
                placeholder="Search unblocked games..."
                className="w-full bg-gaming-900 border border-gaming-700 rounded-full py-2 px-4 focus:outline-none focus:border-gaming-accent transition-colors text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {filteredGames.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-gaming-800 rounded-lg shadow-xl border border-gaming-700 overflow-hidden">
                  {filteredGames.slice(0, 5).map(game => (
                    <Link 
                      key={game.id} 
                      to={`/game/${game.id}`}
                      className="block px-4 py-2 hover:bg-gaming-700 flex items-center gap-2"
                      onClick={() => setSearch('')}
                    >
                      <img src={game.thumbnail} className="w-8 h-8 rounded object-cover" alt="" />
                      <span>{game.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className={`hover:text-gaming-accent ${location.pathname === '/' ? 'text-gaming-accent' : 'text-gray-300'}`}>Home</Link>
              <Link to="/category/action" className="hover:text-gaming-accent text-gray-300">Action</Link>
              <Link to="/category/racing" className="hover:text-gaming-accent text-gray-300">Racing</Link>
              <Link to="/category/puzzle" className="hover:text-gaming-accent text-gray-300">Puzzle</Link>
            </nav>

            <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-gaming-800 border-t border-gaming-700 p-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gaming-900 border border-gaming-700 rounded p-2 mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex flex-col gap-3">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/category/action" onClick={() => setIsMenuOpen(false)}>Action</Link>
                <Link to="/category/racing" onClick={() => setIsMenuOpen(false)}>Racing</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              </div>
           </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gaming-900 border-t border-gaming-700 pt-10 pb-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Unblocked<span className="text-gaming-accent">2025</span></h3>
              <p className="text-gray-400 text-sm">
                The best source for unblocked games at school or work. Play 100% free html5 games without restrictions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Games</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><Link to="/" className="hover:text-white">Most Played</Link></li>
                <li><Link to="/" className="hover:text-white">New Games</Link></li>
                <li><Link to="/" className="hover:text-white">Trending</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><Link to="/privacy.html" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/about.html" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact.html" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Partners</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                 <li><a href="#" className="hover:text-white">Submit a Game</a></li>
                 <li><a href="#" className="hover:text-white">Advertising</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm border-t border-gaming-800 pt-6">
            © 2025 Unblocked Games 2025 Free. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;