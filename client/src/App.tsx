import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import { Search } from './components/search';
import { api, cocktailsReducer, ingredientsReducer } from './store';
import './App.css';

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
        <div className="appContainer">
            <Provider store={store}>
                <Search />
            </Provider>
        </div>
    );
};
