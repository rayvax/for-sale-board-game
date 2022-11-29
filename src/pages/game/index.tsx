import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getGameState } from '../../api/game/api';
import { useAppDispatch } from '../../hooks/redux';
import { useToken } from '../../store/account/hooks';
import { setGameStoreState } from '../../store/game/actions';
import { useGameStoreState } from '../../store/game/hooks';
import { GameTable } from './GameTable';
import { OpponentsList } from './opponents/OpponentsList';
import { PlayerState } from './PlayerState';

const GamePageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export function GamePage() {
  const token = useToken();
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const gameStoreState = useGameStoreState();

  async function updateGameState() {
    if (!token || !code) return;

    const gameState = await getGameState(token, code);
    dispatch(setGameStoreState(gameState));
  }

  //update game state
  useEffect(() => {
    let updateGameStateTimeout: NodeJS.Timeout;

    async function updateGameStateInTimeout() {
      await updateGameState();

      console.log('update game state');
      updateGameStateTimeout = setTimeout(
        () => updateGameStateInTimeout(),
        5000,
      );
    }

    updateGameStateInTimeout();

    return () => clearTimeout(updateGameStateTimeout);
  }, [token, code, dispatch]);

  if (!gameStoreState) return null;

  const { opponents: players } = gameStoreState;

  return (
    <GamePageWrapper>
      <h1>For sale!</h1>
      <GameTable />
      <OpponentsList players={players} />
      <PlayerState updateGameState={updateGameState} />
    </GamePageWrapper>
  );
}
