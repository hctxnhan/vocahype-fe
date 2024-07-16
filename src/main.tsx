import React from 'react';
import ReactDOM from 'react-dom/client';
import { SWRConfig } from 'swr/_internal';

import 'regenerator-runtime/runtime';
import { App } from './App.tsx';
import './index.css';
import { ThemeProvider } from './lib/context/theme.context.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app = (
  <React.StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <ThemeProvider defaultTheme="system">
        <App />
      </ThemeProvider>
    </SWRConfig>
  </React.StrictMode>
);

if (import.meta.env.MODE === 'mock') {
  import('./mocks/browser.ts')
    .then(({ worker }) => {
      void worker.start();
    })
    .then(() => {
      root.render(app);
    })
    .catch(err => {
      throw err;
    });
} else {
  root.render(app);
}
