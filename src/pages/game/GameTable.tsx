import { useMemo } from 'react';
import styled from 'styled-components';
import { CardType } from '../../models/game';
import { useGamePhase, useGameStoreState } from '../../store/game/hooks';
import { TableCardList } from './cards/TableCardList';

type TableState = {
  title: string;
  cardType?: CardType;
  cards?: number[];
};

const TableWrapper = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

const TableTitle = styled.h2`
  text-align: center;
  width: 100%;
`;

export function GameTable() {
  const gameStoreState = useGameStoreState();
  const gamePhase = useGamePhase();

  const tableState: TableState | null = useMemo(() => {
    if (!gameStoreState) return null;

    switch (gamePhase) {
      case 'property':
        return {
          title: 'Table property',
          cardType: 'property',
          cards: gameStoreState.table.properties,
        };
      case 'money':
        return {
          title: 'Table money',
          cardType: 'money',
          cards: gameStoreState.table.money,
        };
      case 'end':
        return {
          title: 'Final score',
        };
    }
  }, [gamePhase, gameStoreState?.table]);

  if (!gameStoreState || !tableState) return null;

  const { title, cardType, cards } = tableState;

  return (
    <TableWrapper>
      <TableTitle>{title}</TableTitle>
      {cardType && cards && <TableCardList cardType={cardType} cards={cards} />}
    </TableWrapper>
  );
}
