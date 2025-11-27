import AppRouter from '@routers/AppRouter';
import ToastProvider from '@shared/contexts/ToastProvider';
import { ThemeProvider } from './shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from './shared/stores/hooks';
import { selectAuth } from './shared/stores/authSlice';
import { useEffect, useState } from 'react';
import { refreshToken } from './shared/stores/authSlice';

function App() {
    const dispatch = useAppDispatch();
    const { refreshToken: savedRefreshToken, accessToken } =
        useAppSelector(selectAuth);

    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (savedRefreshToken && !accessToken) {
                await dispatch(refreshToken(savedRefreshToken));
            }
            setChecking(false);
        };

        init();
    }, [dispatch, savedRefreshToken, accessToken]);

    if (checking) return null;

    return (
        <>
            <ThemeProvider>
                <AppRouter />
                <ToastProvider />
            </ThemeProvider>
        </>
    );
}

export default App;
