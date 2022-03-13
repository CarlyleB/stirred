import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import { Catalog } from './components/catalog';
import { drinksReducer, ingredientsReducer } from './store';
import { baseTheme } from './theme';
import { TopAppBar } from './components/appBar';

export const store = configureStore({
    reducer: combineReducers({
        drinks: drinksReducer,
        ingredients: ingredientsReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

console.log(store.getState());

export const App = () => {
    return (
        <ThemeProvider theme={baseTheme}>
            <Provider store={store}>
                <TopAppBar />
                <Catalog />
            </Provider>
        </ThemeProvider>
    );
};
