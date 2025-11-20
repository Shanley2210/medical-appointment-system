import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import specialtiesReducer from './specialtySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        specialties: specialtiesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
