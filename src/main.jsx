import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// CRITICAL: Importing the CSS here ensures Tailwind classes (including custom colors and dark mode utilities) are loaded.
import './index.css';

import { ThemeProvider } from './contexts/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
