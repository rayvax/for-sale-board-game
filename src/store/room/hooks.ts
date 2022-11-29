import { useAppSelector } from '../../hooks/redux';

export function useRoomCode() {
  return useAppSelector((state) => state.room.code);
}

export function useRoomState() {
  return useAppSelector((state) => state.room.roomState);
}
