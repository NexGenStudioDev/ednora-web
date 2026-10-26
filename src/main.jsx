import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { appStore } from './store/appStore';
import { Provider } from 'react-redux';
import axios from 'axios';

// Configure Axios: In development, keep baseURL relative so Vite's proxy transparently forwards /api
// requests without any browser CORS restrictions. In production, use VITE_BACKEND_URL if provided.
if (import.meta.env.PROD && import.meta.env.VITE_BACKEND_URL) {
   axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
}
axios.defaults.withCredentials = true;

import Lenis from 'lenis';
import { ToastContainer } from 'react-toastify';
import App from './App';

const lenis = new Lenis({
   autoRaf: true,
});

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={appStore}>
         <App />
         <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Provider>
   </StrictMode>,
);
