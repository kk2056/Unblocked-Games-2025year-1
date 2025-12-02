import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import StaticPage from './pages/StaticPages';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game/:id" element={<GamePage />} />
          <Route path=":page" element={<StaticPage />} />
          {/* Fallback for specific category routes to home for this demo */}
          <Route path="category/:cat" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;