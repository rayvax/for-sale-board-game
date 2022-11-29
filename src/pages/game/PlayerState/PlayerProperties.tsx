import styled from 'styled-components';
import { CardType } from '../../../models/game';
import { useHand } from '../../../store/game/hooks';
import { TableCardList } from '../cards/TableCardList';

const PlayerPropertiesWrapper = styled.div`
  display: flex;

  grid-area: prop;
`;

export function PlayerProperties() {
  const hand = useHand();

  if (!hand) return null;

  const { properties } = hand;

  return (
    <PlayerPropertiesWrapper>
      <TableCardList cardType={'property'} cards={properties} />
    </PlayerPropertiesWrapper>
  );
}
