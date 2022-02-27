import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { IngredientList } from './components/ingredients';

import { configureStore } from '@reduxjs/toolkit';
import { api, cocktailsReducer, ingredientsReducer } from './store';

export const store = configureStore({
    reducer: combineReducers({
        cocktails: cocktailsReducer,
        ingredients: ingredientsReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

console.log(store.getState());

export const App = () => {
    return (
        <Provider store={store}>
            <IngredientList />
        </Provider>
    );
};