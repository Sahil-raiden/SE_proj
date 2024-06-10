import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import
import './index.css';
import App from './App';
import { NewscontextProvider } from './context/newscontext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <NewscontextProvider>
      <App />
    </NewscontextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
