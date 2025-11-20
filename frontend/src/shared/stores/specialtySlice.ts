import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
import api from '../apis/api';
import type { RootState } from './store';

export interface ISpecialty {
    id: number;
    name: string;
    description: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface ISpecialtyState {
    list: ISpecialty[];
    loading: boolean;
    error: string | null;
}

const initialState: ISpecialtyState = {
    list: [],
    loading: false,
    error: null
};

export const fetchSpecilties = createAsyncThunk<
    ISpecialty[],
    void,
    { rejectValue: string }
>('specialties/fetchSpecilties', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/specialty');
        const { errCode, message, data } = response.data;
        if (errCode === 0 && Array.isArray(data)) {
            return data as ISpecialty[];
        }

        return rejectWithValue(message || 'Failed to fetch specialties');
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const specialtiesSlice = createSlice({
    name: 'specialties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecilties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchSpecilties.fulfilled,
                (state, action: PayloadAction<ISpecialty[]>) => {
                    state.loading = false;
                    state.list = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchSpecilties.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error = action.payload as string;
            });
    }
});

export const selectSpecialty = (state: RootState) => state.specialties;

export default specialtiesSlice.reducer;
