import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGameAPI } from '../../api/game/hooks';
import { useAppDispatch } from '../../hooks/redux';
import { useGameStoreState } from '../../store/game/hooks';
import { setRoomCode } from '../../store/room/actions';
import { useRoomCode } from '../../store/room/hooks';
import { GameTable } from './GameTable';
import { OpponentsList } from './opponents/OpponentsList';
import { PlayerState } from './PlayerState';

const GamePageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export function GamePage() {
  const stateRoomCode = useRoomCode();
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const gameStoreState = useGameStoreState();
  const gameApi = useGameAPI();

  //update game state
  useEffect(() => {
    let updateGameStateTimeout: NodeJS.Timeout;

    async function updateGameStateInTimeout() {
      try {
        if (!gameApi) return;

        await gameApi!.updateGameState();
        console.log('game state updated');
      } finally {
        updateGameStateTimeout = setTimeout(
          () => updateGameStateInTimeout(),
          5000,
        );
      }
    }

    updateGameStateInTimeout();

    return () => clearTimeout(updateGameStateTimeout);
  }, [gameApi]);

  //save room code
  useEffect(() => {
    if (!code || code === stateRoomCode) return;

    dispatch(setRoomCode({ code }));
  }, [code, stateRoomCode, dispatch]);

  if (!gameStoreState) return null;

  const { opponents: players } = gameStoreState;

  return (
    <GamePageWrapper>
      <h1>For sale!</h1>
      <GameTable />
      <OpponentsList players={players} />
      <PlayerState />
    </GamePageWrapper>
  );
}
