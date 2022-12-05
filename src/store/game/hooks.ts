import { useAppSelector } from '../../hooks/redux';
import { GamePhase, Hand, PlayerData } from '../../models/game';

export function useGameStoreState() {
  return useAppSelector((state) => state.game);
}

export function useTurnEndsIn(): number {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.turnEndsIn ?? 0;
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
