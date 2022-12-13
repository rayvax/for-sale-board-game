import styled from 'styled-components';
import { useHand } from '../../../store/game/hooks';
import { Card } from '../cards/Card';
import { MoneyCard } from '../cards/MoneyCard';

const StyledPlayerMoneyList = styled.ul<{ elemCount: number }>`
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: repeat(${({ elemCount }) => elemCount}, auto);
  width: 500px;

  grid-area: money;
`;

const StyledPlayerMoneyItem = styled.li`
  &:not(:first-child) {
    margin-left: -2rem;
  }
`;

export function PlayerMoneyList() {
  const hand = useHand();

  if (!hand) return null;

  const { money } = hand;

  return (
    <StyledPlayerMoneyList elemCount={money.length}>
      {money.map((m, i) => (
        <StyledPlayerMoneyItem key={`hand-money-${i}`}>
          <MoneyCard value={m} />
        </StyledPlayerMoneyItem>
      ))}
    </StyledPlayerMoneyList>
  );
}
