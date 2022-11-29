import { createReducer } from '@reduxjs/toolkit';
import {
  GamePhase,
  Hand,
  OpponentData,
  PlayerData,
  Table,
} from '../../models/game';
import { clearGameStoreState, setGameStoreState } from './actions';

export type GameStoreState = null | {
  player: PlayerData;
  opponents: OpponentData[];
  turnEndsIn: number | null;

  hand: Hand;
  table: Table;

  gamePhase: GamePhase;
};

const initialState: GameStoreState = null;

export default createReducer(initialState as GameStoreState, (builder) =>
  builder
    .addCase(setGameStoreState, (state, { payload }) => (state = payload))
    .addCase(clearGameStoreState, (state) => (state = null)),
);
