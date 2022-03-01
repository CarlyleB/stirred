import { createSlice, Slice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { apiCallStarted, CallStartedPayload } from '../actions';

const cocktailsSlice: Slice = createSlice({
    name: 'cocktails',
    initialState: {
        list: [],
        loading: false,
    },

    reducers: {
        cocktailsRequested: (cocktails, action) => {
            cocktails.loading = true;
        },

        cocktailsReceived: (cocktails, action) => {
            cocktails.list = action.payload;
            cocktails.loading = false;
        },

        cocktailsRequestFailed: (cocktails, action) => {
            cocktails.loading = false;
        },
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;

const { cocktailsRequested, cocktailsReceived, cocktailsRequestFailed } = cocktailsSlice.actions;

const url = '/drinks';

export const loadCocktails = (ingredients: Array<string>) => (dispatch: Dispatch<{payload: CallStartedPayload}>) => {
    return dispatch(
        apiCallStarted({
            url: url + '?ingredients=' + ingredients.join(','),
            onStart: cocktailsRequested.type,
            onSuccess: cocktailsReceived.type,
            onError: cocktailsRequestFailed.type,
        })
    );
};
