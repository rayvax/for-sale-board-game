import styled from 'styled-components';
import { PlayerCoins } from './PlayerCoins';
import { PlayerMoney } from './PlayerMoney';
import { PlayerPropertiesList } from './PlayerProperties';
import { PlayerTurnInfo } from './PlayerTurnState';

const PlayerWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 1rem;

  display: grid;
  grid-template-areas: 'turn turn turn' 'money coins prop';

  grid-template-columns: minmax(0, 1fr) 200px minmax(0, 1fr);
`;

export function PlayerState() {
  return (
    <PlayerWrapper>
      <PlayerTurnInfo />
      <PlayerMoney />
      <PlayerCoins />
      <PlayerPropertiesList />
    </PlayerWrapper>
  );
}
