import { ActionCreatorWithPayload, createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';

export const fetchIngredients = createAsyncThunk('/ingredients', async () => {
    const response = await axios.request({
        baseURL:'http://localhost:3000',
        url: '/ingredients'
    });
    return response.data
});

export interface IngredientState {
    list: Array<any>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IngredientState = {
    list: [],
    status: 'idle',
    error: null
};

const ingredientsSlice: Slice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        ingredientSelected: (state: IngredientState, { payload }) => {
            const ingredientIdx: number = state.list.findIndex((i) => i.name === payload.name);
            if (ingredientIdx >= 0) {
                state.list[ingredientIdx].selected = !state.list[ingredientIdx].selected;
            }
            return state;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIngredients.pending, (state, _action) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;

const {
    ingredientSelected
} = ingredientsSlice.actions;

// --- Selectors --- //
export const getAllIngredients = (state: any) => state.ingredients.list;

export const getSelectedIngredients = (state: IngredientState): Array<any> => {
    return state.list.filter((ingredient) => !!ingredient.selected);
};

// --- Thunks --- //
/* export const selectIngredient = (name: string) => (dispatch: Dispatch<{payload: {name: string}}>) => {
    return dispatch()
}
 */
