export type Room = { code: string; admin: string; hasPassword: boolean };

export type RoomMember = { nickname: string; isAdmin: boolean };
export type RoomState = {
  hasGameStarted: boolean;
  turnDuration: number;
  roomMembers: RoomMember[];
};
