import { useAppSelector } from '../stores/hooks';
import { selectAuth } from '../stores/authSlice';
import { Navigate } from 'react-router-dom';

export default function GuestOnly({ children }: { children: JSX.Element }) {
    const { isAuthenticated, user } = useAppSelector(selectAuth);

    if (isAuthenticated && user) {
        switch (user.role) {
            case 1:
            case 2:
                return <Navigate to='/admin/dashboard' replace />;
            default:
                return <Navigate to='/' replace />;
        }
    }

    return children;
}
