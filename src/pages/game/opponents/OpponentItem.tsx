import { Check, X } from 'react-feather';
import styled from 'styled-components';
import { colors } from '../../../constants/theme';
import { OpponentData } from '../../../models/game';
import { useTurnEndsIn } from '../../../store/game/hooks';

const OpponentWrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;

  max-width: 500px;

  background-color: ${colors.bg1};
  border: 3px solid ${colors.bg2};
`;

const OpponentInfoRow = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.1rem;

  display: flex;

  &:not(:last-child) {
    border-bottom: 3px solid ${colors.bg2};
  }
`;
const CurrentTurnIndicator = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    180deg,
    ${colors.primary2} 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const OutsideWrapper = styled.div`
  width: 100%;

  position: absolute;
  left: 50%;
  bottom: -3px;
  transform: translate(-50%, 100%);
`;

const OpponentNickname = styled.h3`
  margin: 0;
`;

interface OppenentProps {
  opponent: OpponentData;
}

export function OpponentItem({ opponent }: OppenentProps) {
  const turnEndsIn = useTurnEndsIn();

  return (
    <OpponentWrapper>
      <OutsideWrapper>
        {opponent.isCurrentTurn && (
          <CurrentTurnIndicator>{turnEndsIn}</CurrentTurnIndicator>
        )}
      </OutsideWrapper>
      <OpponentInfoRow>
        <OpponentNickname>
          {opponent.orderNumber}. {opponent.nickname}
        </OpponentNickname>
      </OpponentInfoRow>
      <OpponentInfoRow>
        <dt>Passed</dt>
        <dd>{opponent.passed ? <Check /> : <X />}</dd>
      </OpponentInfoRow>
      <OpponentInfoRow>
        <dt>Bid</dt>
        <dd>{opponent.bid}</dd>
      </OpponentInfoRow>
      {!!opponent.lastBidProperty && opponent.lastBidMoney !== undefined && (
        <>
          <OpponentInfoRow>
            <dt>Last bid property</dt>
            <dd>{opponent.lastBidProperty}</dd>
          </OpponentInfoRow>
          <OpponentInfoRow>
            <dt>Last taken money</dt>
            <dd>{opponent.lastBidMoney}</dd>
          </OpponentInfoRow>
        </>
      )}
    </OpponentWrapper>
  );
}
