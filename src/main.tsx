import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Game } from './components/Game';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div id="gameContainer" style={{ width: '100vw', height: '100vh' }}>
    <Game />
    </div>
  </React.StrictMode>,
);
