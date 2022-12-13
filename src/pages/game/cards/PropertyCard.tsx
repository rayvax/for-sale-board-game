import styled from 'styled-components';
import { propertyImgPositions } from '../../../constants/static-data';
import { colors } from '../../../constants/theme';

type StyledPropertyCardProps = {
  imgUrl: string;
  imgPosition: { x: number; y: number };
  hoverPointer: boolean;
};
const StyledPropertyCard = styled.div<StyledPropertyCardProps>`
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

  ${({ hoverPointer }) =>
    hoverPointer &&
    `
    & :hover{
      cursor: pointer;

      box-shadow: 0 0 10px 5px ${colors.primary2};
    }
  `}
`;

type PropertyCardProps = {
  property: number;
  hoverPointer?: boolean;
  onClick?: () => void;
};

export function PropertyCard({
  property,
  hoverPointer,
  onClick,
}: PropertyCardProps) {
  return (
    <StyledPropertyCard
      imgUrl={`${process.env.PUBLIC_URL}/cards/properties.jpg`}
      imgPosition={propertyImgPositions[property]}
      hoverPointer={!!hoverPointer}
      onClick={onClick}
    />
  );
}
