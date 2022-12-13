import styled from 'styled-components';
import { useHand } from '../../../store/game/hooks';
import { Card } from '../cards/Card';
const PlayerMoneyWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  width: 100%;

  display: grid;
  grid-auto-flow: column;

  grid-area: money;
`;

export function PlayerMoney() {
  const hand = useHand();

  if (!hand) return null;

  const { money } = hand;

  return (
    <PlayerMoneyWrapper>
      {money.map((m, i) => (
        <li key={`hand-money-${i}`}>
          <Card type='money' value={m} />
        </li>
      ))}
    </PlayerMoneyWrapper>
  );
}
