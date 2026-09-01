import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  // Fallback to classic window.onerror to return true and completely silence 'Script error.'
  window.onerror = function (message, url, line, col, error) {
    const msgStr = String(message || '');
    const urlStr = String(url || '');
    if (!message || msgStr.includes('Script error') || !url || urlStr.includes('youtube.com') || urlStr.includes('ytimg.com') || urlStr.includes('wistia.com') || urlStr.includes('cardoso3d.com')) {
      return true; // Prevents the fire of default error handler
    }
    return false;
  };

  window.addEventListener('error', (e) => {
    // Suppress benign third-party script errors (e.g. tracking pixels, GTM, YT iframe) in sandboxed preview
    const msgStr = String(e.message || '');
    if (!e.message || msgStr === 'Script error.' || msgStr.includes('Script error') || !e.filename) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    if (!e || !e.reason || e.reason.message === 'Script error.' || e.reason.message?.includes('Script error')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

