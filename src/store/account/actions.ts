import { createAction } from '@reduxjs/toolkit';

export const setToken = createAction<{ token: string | null }>('account/setToken');
