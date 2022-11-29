import styled from 'styled-components';
import { usePlayerData, useTurnEndsIn } from '../../../store/game/hooks';

const PlayerTurnInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  grid-area: turn;
`;

export function PlayerTurnInfo() {
  const player = usePlayerData();
  const turnEndsIn = useTurnEndsIn();

  if (!player || !player.isCurrentTurn) return null;

  return (
    <PlayerTurnInfoWrapper>Turn ends in: {turnEndsIn}</PlayerTurnInfoWrapper>
  );
}
