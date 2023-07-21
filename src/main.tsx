import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { worker } from './mocks/browser.ts';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// if (import.meta.env.MODE === 'development') {
//   import('./mocks/browser.ts')
// .then(({ worker }) => {
void worker.start();
// })
// .then(() => {
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// } else {
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }
