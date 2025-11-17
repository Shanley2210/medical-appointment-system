import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
import api from '../apis/api';
import type { RootState } from './store';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: number;
}

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

interface LoginSuccessPayload {
    user: User;
    errCode: number;
    message: string;
    tokens: Tokens;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    refreshToken: localStorage.getItem('refreshToken'),
    accessToken: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

export const login = createAsyncThunk<
    LoginSuccessPayload,
    any,
    { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login', credentials);

        const { tokens, user, message, errMessage, errCode } = response.data;

        if (errCode === 0 && tokens) {
            localStorage.setItem('refreshToken', tokens.refreshToken);
            return {
                user,
                errCode,
                message,
                tokens
            } as LoginSuccessPayload;
        }

        return rejectWithValue(errMessage || 'Login failed');
    } catch (e: any) {
        return rejectWithValue(
            e.response?.data?.errMessage || 'Server error occurred during login'
        );
    }
});

export const refreshToken = createAsyncThunk<
    Tokens,
    string,
    { rejectValue: string }
>('auth/refreshToken', async (oldRefreshToken, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/refresh-token', {
            refreshToken: oldRefreshToken
        });

        const { accessToken, message, errCode } = response.data;

        if (errCode === 0 && accessToken) {
            return {
                accessToken,
                refreshToken: oldRefreshToken
            } as Tokens;
        }

        return rejectWithValue(message || 'Refresh token failed');
    } catch (e: any) {
        return rejectWithValue(
            e.response?.data?.errMessage ||
                'Server error occurred during refresh token'
        );
    }
});

export const logout = createAsyncThunk<void, string, { rejectValue: string }>(
    'auth/logout',
    async (refreshToken) => {
        try {
            await api.post('/auth/logout', {
                refreshToken
            });

            localStorage.removeItem('refreshToken');
        } catch (e: any) {
            localStorage.removeItem('refreshToken');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clientLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('refreshToken');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<LoginSuccessPayload>) => {
                    state.loading = false;
                    state.accessToken = action.payload.tokens.accessToken;
                    state.user = action.payload.user;
                    state.refreshToken = action.payload.tokens.refreshToken;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Login failed';
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
            })
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                refreshToken.fulfilled,
                (state, action: PayloadAction<Tokens>) => {
                    state.loading = false;
                    state.accessToken = action.payload.accessToken;
                    state.isAuthenticated = true;
                }
            )
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                localStorage.removeItem('refreshToken');
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            });
    }
});

export const { clientLogout, setUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
