import styled from 'styled-components';
import { useGameAPI } from '../../../../api/game/hooks';
import { propertyImgPositions } from '../../../../constants/static-data';
import { colors } from '../../../../constants/theme';
import Background from './money_0.jpg';

const StyledPropertyCard = styled.div<{
  imgUrl: string;
  imgPosition: { x: number; y: number };
}>`
  width: 7rem;
  min-height: 9rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  background-image: url(${({ imgUrl }) => imgUrl});
  background-position: ${({ imgPosition }) =>
    `-${imgPosition.x * 7}rem -${imgPosition.y * 9}rem`};
  background-size: 70rem 27rem;
  border-radius: 0.5rem;
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
    <StyledPropertyCard
      imgUrl={`${process.env.PUBLIC_URL}/cards/properties.jpg`}
      imgPosition={propertyImgPositions[property]}
    >
      {canBid && (
        <button type='button' onClick={handleBidProperty} disabled={isLoading}>
          Bid
        </button>
      )}
    </StyledPropertyCard>
  );
}
