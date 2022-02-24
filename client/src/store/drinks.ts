import { createSlice, Slice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { apiCallStarted, CallStartedPayload } from './actions';

const drinksSlice: Slice = createSlice({
    name: 'drinks',
    initialState: {
        list: [],
        loading: false,
    },

    reducers: {
        drinksRequested: (drinks, action) => {
            drinks.loading = true;
        },

        drinksReceived: (drinks, action) => {
            drinks.list = action.payload;
            drinks.loading = false;
        },

        drinksRequestFailed: (drinks, action) => {
            drinks.loading = false;
        },
    },
});

export const drinksReducer = drinksSlice.reducer;

const { drinksRequested, drinksReceived, drinksRequestFailed } = drinksSlice.actions;

const url = '/json/v1/1/filter.php?i=Gin';

export const loadDrinks = () => (dispatch: Dispatch<{payload: CallStartedPayload}>) => {
    return dispatch(
        apiCallStarted({
            url,
            onStart: drinksRequested.type,
            onSuccess: drinksReceived.type,
            onError: drinksRequestFailed.type,
        })
    );
};
