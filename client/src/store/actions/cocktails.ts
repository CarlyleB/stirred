import { createAction } from '@reduxjs/toolkit';

export type CallStartedPayload = {
    url: string;
    onStart: string;
    onError: string;
    onSuccess: string;
}

export const apiCallStarted = createAction<CallStartedPayload>('api/callStarted');
export const apiCallSucceeded = createAction<Array<any>>('api/callSucceeded');
export const apiCallFailed = createAction<string>('api/callFailed');
