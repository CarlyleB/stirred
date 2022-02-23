import { Provider } from 'react-redux';
import { DrinkList } from './components/drinks';

import { configureStore } from '@reduxjs/toolkit';
import { drinksReducer, drinksApi } from './store';

export const store = configureStore({
    reducer: drinksReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(drinksApi)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const App = () => {
    return (
        <Provider store={store}>
            <DrinkList />
        </Provider>
    );
};
