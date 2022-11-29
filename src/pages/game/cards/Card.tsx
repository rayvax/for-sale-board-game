import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/theme';
import { CardType } from '../../../models/game';

interface CardProperty {
  type: CardType;
  value: number;
}

const StyledCard = styled.div`
  min-width: 110px;
  min-height: 150px;

  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  background-color: ${colors.bg1};
  border: 3px solid ${colors.primary};
  border-radius: 20px;
`;

const CardValue = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
`;

export function Card({ type, value }: CardProperty) {
  return (
    <StyledCard>
      <h3>{type}</h3> <CardValue>{value}</CardValue>
    </StyledCard>
  );
}
