import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@/shared/configs/i18n';
import { Provider } from 'react-redux';
import { store } from './shared/stores/store.ts';
import { setupAxiosInterceptors } from './shared/apis/axiosConfig.ts';

setupAxiosInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
