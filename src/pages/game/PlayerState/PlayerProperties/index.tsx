import { useState } from 'react';
import styled from 'styled-components';
import { GamePhase } from '../../../../models/game';
import {
  useGamePhase,
  useHand,
  usePlayerData,
} from '../../../../store/game/hooks';
import { StakedCardLI } from '../../cards/StakedCardLI';
import { PlayerPropertyCard } from './PlayerProperty';

const PlayerPropertiesStyledList = styled.ul`
  display: flex;

  grid-area: prop;

  margin: 0;
  padding: 0;
  list-style: none;
`;

export function PlayerPropertiesList() {
  const hand = useHand();
  const gamePhase = useGamePhase();
  const player = usePlayerData();

  const [isLoading, setIsLoading] = useState(false);

  if (!hand || !player) return null;

  const { properties } = hand;
  const canBid = player.isCurrentTurn && gamePhase === GamePhase.BID_PROPERTY;

  return (
    <PlayerPropertiesStyledList>
      {properties.map((property) => (
        <StakedCardLI key={`${property}-hand-property`}>
          <PlayerPropertyCard
            property={property}
            canBid={canBid}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </StakedCardLI>
      ))}
    </PlayerPropertiesStyledList>
  );
}
