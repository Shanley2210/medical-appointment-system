import AppRouter from '@routers/AppRouter';
import ToastProvider from '@shared/contexts/ToastProvider';

function App() {
    return (
        <>
            <AppRouter />;
            <ToastProvider />
        </>
    );
}

export default App;
