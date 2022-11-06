import { createReducer } from '@reduxjs/toolkit';
import { setToken } from './actions';

type AccountState = {
  token: string | null;
};

const initialState: AccountState = {
  token: null,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setToken, (state, { payload }) => {
    const { token } = payload;
    state.token = token;
  }),
);
