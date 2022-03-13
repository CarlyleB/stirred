import { ActionCreatorWithPayload, createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface DrinkState {
    list: Array<any>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DrinkState = {
    list: [],
    status: 'idle',
    error: null
};

export const fetchDrinks = createAsyncThunk('/drinks', async (ingredients: Array<any> = []) => {
    const response = await axios.request({
        baseURL:'http://localhost:3000',
        url: '/drinks?ingredients=' + ingredients.join(',')
    });
    return response.data
});

const drinksSlice: Slice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDrinks.pending, (state, _action) => {
                state.status = 'loading';
            })
            .addCase(fetchDrinks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchDrinks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export const drinksReducer = drinksSlice.reducer;

export const { drinksRequested, drinksReceived, drinksRequestFailed } = drinksSlice.actions;

export const getDrinks = (state: any) => state.drinks.list;
