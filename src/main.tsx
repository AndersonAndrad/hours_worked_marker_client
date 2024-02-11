import './globals.css';

import { App } from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WorkContextProvider } from './app/contexts/work.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorkContextProvider>
      <App />
    </WorkContextProvider>
  </React.StrictMode>,
)
