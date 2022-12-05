import styled from 'styled-components';
import { useGameAPI } from '../../../../api/game/hooks';
import { colors } from '../../../../constants/theme';

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

type PlayerPropertyProps = {
  property: number;
  canBid: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export function PlayerPropertyCard({
  property,
  canBid,
  isLoading,
  setIsLoading,
}: PlayerPropertyProps) {
  const gameApi = useGameAPI();

  function handleBidProperty() {
    if (!canBid || !gameApi) return;

    (async function () {
      try {
        setIsLoading(true);

        await gameApi.bidProperty(property);
        await gameApi.updateGameState();
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <StyledCard>
      <h3>property</h3> <CardValue>{property}</CardValue>
      {canBid && (
        <button type='button' onClick={handleBidProperty} disabled={isLoading}>
          Bid
        </button>
      )}
    </StyledCard>
  );
}
