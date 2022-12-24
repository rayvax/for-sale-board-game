import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { GamePhase, Hand, PlayerData } from '../../models/game';

export function useGameStoreState() {
  return useAppSelector((state) => state.game);
}

export function useTurnEndsIn(): number {
  const GameStoreState = useGameStoreState();
  const [turnEndsIn, setTurnEndsIn] = useState(0);

  useEffect(() => {
    if (!GameStoreState?.turnEndsIn) return;

    setTurnEndsIn(GameStoreState.turnEndsIn);
    const turnEndInterval = setInterval(() => {
      setTurnEndsIn((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(turnEndInterval);
  }, [GameStoreState?.turnEndsIn]);

  return turnEndsIn;
}

export function useGamePhase(): GamePhase {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.gamePhase ?? GamePhase.END;
}

export function usePlayerData(): PlayerData | null {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.player ?? null;
}

export function useHand(): Hand | null {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.hand ?? null;
}
