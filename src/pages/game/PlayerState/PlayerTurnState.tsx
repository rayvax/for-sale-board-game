import styled from 'styled-components';
import { colors } from '../../../constants/theme';
import { usePlayerData, useTurnEndsIn } from '../../../store/game/hooks';

const PlayerTurnInfoWrapper = styled.div`
  grid-area: turn;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100px;
  background: linear-gradient(
    0deg,
    ${colors.primary2} 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export function PlayerTurnInfo() {
  const player = usePlayerData();
  const turnEndsIn = useTurnEndsIn();

  if (!player || !player.isCurrentTurn) return null;

  return (
    <PlayerTurnInfoWrapper>Turn ends in: {turnEndsIn}</PlayerTurnInfoWrapper>
  );
}
