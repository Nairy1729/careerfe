import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { PersonProvider } from './Services/PersonContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersonProvider>
      <App />
    </PersonProvider>
  </React.StrictMode>
);


reportWebVitals();
