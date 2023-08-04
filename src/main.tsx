import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { SWRConfig } from 'swr/_internal';

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
      <App />
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
      console.error(err);
    });
} else {
  root.render(app);
}
