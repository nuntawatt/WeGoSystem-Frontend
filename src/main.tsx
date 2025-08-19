import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Wego';
if (document.title !== APP_NAME) document.title = APP_NAME;

// สร้าง client หนึ่งตัวสำหรับทั้งแอป
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30_000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);