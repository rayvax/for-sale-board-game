import styled from 'styled-components';

const moneyCardWidth = 6;
const moneyCardAspectRatio = 1.838;
const moneyCardHeight = moneyCardWidth * moneyCardAspectRatio;

const MoneyCardWrapper = styled.div`
  width: ${moneyCardWidth}rem;
  height: ${moneyCardHeight}rem;
  position: relative;
`;

type StyledMoneyCardProps = {
  imgUrl: string;
};
const StyledMoneyCard = styled.div<StyledMoneyCardProps>`
  width: ${moneyCardHeight}rem;
  height: ${moneyCardWidth}rem;

  background-image: url(${({ imgUrl }) => imgUrl});
  transform: rotate(-90deg);
  background-size: contain;
  background-repeat: no-repeat;

  position: absolute;
  top: 25%;
  left: -50%;
  border-radius: 5px;
`;

type PropertyCardProps = {
  value: number;
};

export function MoneyCard({ value }: PropertyCardProps) {
  return (
    <MoneyCardWrapper>
      <StyledMoneyCard
        imgUrl={`${process.env.PUBLIC_URL}/cards/money_${value}.jpg`}
      />
    </MoneyCardWrapper>
  );
}
