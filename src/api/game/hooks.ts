import { useToken } from '../../store/account/hooks';
import { useRoomCode } from '../../store/room/hooks';
import { bidCoins, getGameState, pass, startGame } from './api';

export function useGameAPI() {
  const token = useToken();
  const roomCode = useRoomCode();

  if (!token || !roomCode) return null;

  return {
    startGame: () => startGame(token, roomCode),
    getGameState: () => getGameState(token, roomCode),
    pass: () => pass(token, roomCode),
    bidCoins: (bid: number) => bidCoins(token, roomCode, bid.toString()),
  };
}
