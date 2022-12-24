import styled from 'styled-components';
import { PlayerCoins } from './PlayerCoins';
import { PlayerMoneyList } from './PlayerMoney';
import { PlayerPropertiesList } from './PlayerProperties';
import { PlayerMainInfo } from './PlayerTurnState';

const PlayerWrapper = styled.div`
  width: 90%;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0);

  display: grid;
  grid-template-areas: 'turn turn turn' 'money coins prop';

  grid-template-columns: minmax(0, 1fr) 200px minmax(0, 1fr);
`;

export function PlayerState() {
  return (
    <PlayerWrapper>
      <PlayerMainInfo />
      <PlayerMoneyList />
      <PlayerCoins />
      <PlayerPropertiesList />
    </PlayerWrapper>
  );
}
