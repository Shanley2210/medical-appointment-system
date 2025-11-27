import Login from '@/shared/pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientRouter from './PatientRouter';
import AdminRouter from './AdminRouter';
import GuestOnly from '@/shared/components/GuestOnly';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/login'
                    element={
                        <GuestOnly>
                            <Login />
                        </GuestOnly>
                    }
                />

                <Route path='/*' element={<PatientRouter />} />
                <Route path='/admin/*' element={<AdminRouter />} />
            </Routes>
        </BrowserRouter>
    );
}
