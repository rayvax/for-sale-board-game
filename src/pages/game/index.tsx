import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGameAPI } from '../../api/game/hooks';
import { leaveRoom } from '../../api/rooms/api';
import { useAppDispatch } from '../../hooks/redux';
import { GamePhase } from '../../models/game';
import { useToken } from '../../store/account/hooks';
import { useGamePhase, useGameStoreState } from '../../store/game/hooks';
import { setRoomCode } from '../../store/room/actions';
import { useRoomCode } from '../../store/room/hooks';
import { roomsDashboardPath } from '../../utils/paths';
import { GameTable } from './GameTable';
import { OpponentsList } from './opponents/OpponentsList';
import { PlayerState } from './PlayerState';

const GamePageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CornerButtonsList = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export function GamePage() {
  const stateRoomCode = useRoomCode();
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const gameStoreState = useGameStoreState();
  const gamePhase = useGamePhase();
  const gameApi = useGameAPI();
  const token = useToken();
  const roomCode = useRoomCode();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [updateGameStateTimeout, setUpdateGameStateTimeout] =
    useState<NodeJS.Timeout | null>(null);

  //update game state
  useEffect(() => {
    async function updateGameStateInTimeout() {
      if (!gameApi) return;

      try {
        await gameApi!.updateGameState();
        console.log('game state updated');
      } catch (e) {
        console.error(e);
      }

      if (gameApi) {
        setUpdateGameStateTimeout(
          setTimeout(() => updateGameStateInTimeout(), 5000),
        );
      }
    }

    updateGameStateInTimeout();

    return () => {
      if (updateGameStateTimeout) clearTimeout(updateGameStateTimeout);
    };
  }, [gameApi]);

  //save room code
  useEffect(() => {
    if (!code || code === stateRoomCode) return;

    dispatch(setRoomCode({ code }));
  }, [code, stateRoomCode, dispatch]);

  function handleLeaveGame() {
    if (!token || !roomCode) return;

    (async function () {
      setIsLoading(true);
      try {
        if (updateGameStateTimeout) clearTimeout(updateGameStateTimeout);

        await leaveRoom(token, roomCode);
        navigate(roomsDashboardPath);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function handleGoToRoomsList() {
    navigate(roomsDashboardPath);
  }

  if (!gameStoreState) return null;

  const { opponents: players } = gameStoreState;

  return (
    <GamePageWrapper>
      <h1 className={'visually-hidden'}>For sale!</h1>
      <GameTable />
      <OpponentsList players={players} />
      <PlayerState />
      {gamePhase !== GamePhase.END ? (
        <CornerButtonsList
          type='button'
          onClick={handleLeaveGame}
          disabled={isLoading}
        >
          Leave game
        </CornerButtonsList>
      ) : (
        <CornerButtonsList
          type='button'
          onClick={handleGoToRoomsList}
          disabled={isLoading}
        >
          Go to rooms list
        </CornerButtonsList>
      )}
    </GamePageWrapper>
  );
}
