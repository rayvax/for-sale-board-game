import React, { useState } from 'react';
import styled from 'styled-components';
import { bidCoins, pass } from '../../../api/game/api';
import { useGameAPI } from '../../../api/game/hooks';
import { useToken } from '../../../store/account/hooks';
import {
  useGamePhase,
  useHand,
  usePlayerData,
} from '../../../store/game/hooks';
import { useRoomCode } from '../../../store/room/hooks';

const PlayerCoinsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  grid-area: coins;
`;

type PlayerCoinsComponentProps = {
  updateGameState: () => Promise<void>;
};

export function PlayerCoins({ updateGameState }: PlayerCoinsComponentProps) {
  const player = usePlayerData();
  const hand = useHand();
  const gamePhase = useGamePhase();
  const gameApi = useGameAPI();

  const [bidInput, setBidInput] = useState<number | null>();

  if (!player || !hand) return null;

  const { isCurrentTurn } = player;
  const { coins } = hand;

  function handleBid(event: React.FormEvent) {
    event.preventDefault();
    if (!gameApi || !bidInput) return;

    (async function () {
      console.log('Bid coins');
      await gameApi.bidCoins(bidInput);
      await updateGameState();
    })();
  }

  function handlePass() {
    if (!gameApi || !bidInput) return;
    (async function () {
      console.log('Bid coins');
      await gameApi.pass();
      await updateGameState();
    })();
  }

  return (
    <PlayerCoinsWrapper>
      <div>{coins} Coins</div>
      {isCurrentTurn && gamePhase === 'property' && (
        <>
          <h2>Your turn</h2>
          <form onSubmit={handleBid}>
            <input
              type='number'
              value={bidInput ? bidInput.toString() : ''}
              onChange={(e) => setBidInput(Number(e.target.value))}
            />
            <button type='submit' onClick={handleBid} disabled={!bidInput}>
              Bid
            </button>
            <button type='button' onClick={handlePass}>
              Pass
            </button>
          </form>
        </>
      )}
    </PlayerCoinsWrapper>
  );
}
