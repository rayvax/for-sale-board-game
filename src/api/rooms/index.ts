import { runProcedure } from '..';
import { RoomMember, RoomState } from '../../models/room';

export type ResponseRoom = {
  code: string[];
  admin: string[];
  hasPassword: number[];
};
export type RoomsResponse = {
  RESULTS: [ResponseRoom];
};

export async function showRooms(token: string) {
  const resp = await runProcedure<RoomsResponse>('showRooms', {
    param1: token,
  });

  return resp.RESULTS[0];
}

export type RoomStateResponse = {
  RESULTS: [
    { hasGameStarted: [number] },
    { user: string[]; isAdmin: number[] },
    { turnDuration: [number] },
  ];
};

export async function enterRoom(
  token: string,
  code: string,
  password?: string,
): Promise<RoomState> {
  const resp = await runProcedure<RoomStateResponse>('enterRoom', {
    param1: token,
    param2: code,
    param3: password ?? null,
  });

  const [{ hasGameStarted }, { user, isAdmin }, { turnDuration }] = resp.RESULTS;

  const roomMembers: RoomMember[] = user.map((nick, i) => ({
    nickname: nick,
    isAdmin: isAdmin[i] === 1,
  }));

  return {
    hasGameStarted: hasGameStarted[0] === 1,
    turnDuration: turnDuration[0],
    roomMembers,
  };
}
