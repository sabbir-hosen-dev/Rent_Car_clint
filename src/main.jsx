import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './Theme.css';
import { ThemeContextProvider } from './Context/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import route from './Routes/Routes';
import { AuthContextProvider } from './Context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={route} />
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
