import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ShopContextProvider from './Context/ShopCategory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './Components/auth/AuthContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
