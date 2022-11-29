import { createReducer } from '@reduxjs/toolkit';
import { RoomState } from '../../models/room';
import { clearRoomState, saveRoomState, updateRoomState } from './actions';

type RoomStoreState = {
  roomState: RoomState | null;
  code: string | null;
};

const initialState: RoomStoreState = {
  roomState: null,
  code: null,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(saveRoomState, (state, { payload }) => {
      const { code, roomState } = payload;

      state.code = code;
      state.roomState = roomState;
    })
    .addCase(updateRoomState, (state, { payload }) => {
      const { roomState } = payload;
      state.roomState = roomState;
    })
    .addCase(clearRoomState, (state) => {
      state.code = null;
      state.roomState = null;
    }),
);
