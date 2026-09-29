import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { FavouritesProvider } from './context/FavouritesContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
