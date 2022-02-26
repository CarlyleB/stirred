import { createSlice, Slice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { apiCallStarted, CallStartedPayload } from '../actions';

export interface IngredientState {
    list: Array<any>;
    loading: boolean;
}

const initialState: IngredientState = {
    list: [],
    loading: false
};

const ingredientsSlice: Slice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        ingredientsRequested: (state: IngredientState, _action) => {
            state.loading = true;
        },
        ingredientsReceived: (state: IngredientState, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        ingredientsRequestFailed: (state: IngredientState, _action) => {
            state.loading = false;
        },
    },
});

export const ingredientsReducer = ingredientsSlice.reducer;

const { ingredientsRequested, ingredientsReceived, ingredientsRequestFailed } = ingredientsSlice.actions;

const url = '/ingredients';

export const loadIngredients = () => (dispatch: Dispatch<{payload: CallStartedPayload}>) => {
    return dispatch(
        apiCallStarted({
            url,
            onStart: ingredientsRequested.type,
            onSuccess: ingredientsReceived.type,
            onError: ingredientsRequestFailed.type,
        })
    );
};
