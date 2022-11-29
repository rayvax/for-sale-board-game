import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getGameState } from '../../api/game/api';
import { useAppDispatch } from '../../hooks/redux';
import { useToken } from '../../store/account/hooks';
import { setGameStoreState } from '../../store/game/actions';
import { useGameStoreState } from '../../store/game/hooks';
import { getErrorMessage, isAuthorizationError } from '../../utils/error';
import { accountPagePath } from '../../utils/paths';
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
  const navigate = useNavigate();

  const updateGameState = useCallback(async () => {
    if (!token || !code) return;

    try {
      const gameState = await getGameState(token, code);
      dispatch(setGameStoreState(gameState));
    } catch (e) {
      console.error(e);

      if (isAuthorizationError(e)) navigate(accountPagePath);
    }
  }, [token, code, dispatch]);

  //update game state
  useEffect(() => {
    let updateGameStateTimeout: NodeJS.Timeout;

    async function updateGameStateInTimeout() {
      try {
        await updateGameState();
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
  }, [token, code, dispatch, updateGameState]);

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
