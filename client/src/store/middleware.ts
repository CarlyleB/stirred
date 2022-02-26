import axios, { AxiosResponse } from 'axios';
import { AnyAction, Dispatch, Middleware } from 'redux';

import * as actions from './actions';

export const api: Middleware = ({ dispatch }) =>
    (next: Dispatch<AnyAction>) =>
    async (action: AnyAction) => {
        if (action.type !== actions.apiCallStarted.type) return next(action);

        const { url, method, data, onStart, onSuccess, onError } =
            action.payload;

        if (onStart) dispatch({ type: onStart });

        next(action);

        try {
            const response: AxiosResponse = await axios.request({
                // baseURL: 'https://jsonplaceholder.typicode.com',
                baseURL:'http://localhost:3001',
                // baseURL: 'https://www.thecocktaildb.com',
                url,
                method,
                data,
            });
            // General
            dispatch(actions.apiCallSucceeded(response.data));
            // Specific
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data });
        } catch (error: any) {
            // General
            dispatch(actions.apiCallFailed(error.message));
            // Specific
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };
