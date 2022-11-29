import styled from 'styled-components';
import { CardType } from '../../../models/game';
import { Card } from './Card';

const CardListWrapper = styled.ul<{ alignRight?: boolean }>`
  display: flex;
  gap: 2rem;

  list-style: none;
  margin: 0;
  padding: 0;

  ${({ alignRight }) => alignRight && 'align-items: right;'}
`;

interface CardListProps {
  cardType: CardType;
  cards: number[];
  alignRight?: boolean;
}

export function TableCardList({ cardType, cards, alignRight }: CardListProps) {
  return (
    <CardListWrapper alignRight={alignRight}>
      {cards.map((card) => (
        <li key={`${cardType}-${card}-table-card`}>
          <Card type={cardType} value={card} />
        </li>
      ))}
    </CardListWrapper>
  );
}
