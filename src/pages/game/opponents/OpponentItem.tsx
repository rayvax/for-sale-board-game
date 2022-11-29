import { Check, Play, X } from 'react-feather';
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
  padding: 1rem 0.5rem;

  display: flex;

  &:not(:last-child) {
    border-bottom: 3px solid ${colors.bg2};
  }
`;

const OutsideWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
`;

const OpponentNickname = styled.h3`
  margin: 0;
`;

interface OppenentProps {
  player: OpponentData;
}

export function OpponentItem({ player }: OppenentProps) {
  const turnEndsIn = useTurnEndsIn();

  return (
    <OpponentWrapper>
      <OutsideWrapper>
        {player.isCurrentTurn && (
          <>
            <Play />
            {turnEndsIn}
          </>
        )}
      </OutsideWrapper>
      <OpponentInfoRow>
        <OpponentNickname>{player.nickname}</OpponentNickname>
      </OpponentInfoRow>
      <OpponentInfoRow>
        <dt>Passed</dt>
        <dd>{player.passed ? <Check /> : <X />}</dd>
      </OpponentInfoRow>
      <OpponentInfoRow>
        <dt>Bid</dt>
        <dd>{player.bid}</dd>
      </OpponentInfoRow>
    </OpponentWrapper>
  );
}
