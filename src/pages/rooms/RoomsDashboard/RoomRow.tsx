import { useState } from 'react';
import { Check, Lock } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { enterRoom } from '../../../api/rooms/api';
import { PrimaryButton } from '../../../components/common/Button';
import { ErrorSpan } from '../../../components/common/Span';
import { Room } from '../../../models/room';
import { useAccountLogin, useToken } from '../../../store/account/hooks';
import { homePagePath, roomPath } from '../../../utils/paths';

type RoomItemProps = {
  room: Room;
};

export function RoomItem({ room }: RoomItemProps) {
  const token = useToken();
  const login = useAccountLogin();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleEnterRoom() {
    if (!token) {
      navigate(homePagePath);
      return;
    }

    if (room.hasPassword) {
      setError('Room has password');
      return;
    }

    try {
      if (room.admin.login !== login) await enterRoom(token, room.code);
      navigate(roomPath(room.code));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <tr>
      <td>{room.code}</td>
      <td>{room.admin.nickname}</td>
      <td>{room.hasPassword && <Lock />}</td>
      <td>
        <PrimaryButton onClick={handleEnterRoom}>Enter room</PrimaryButton>
        {error && <ErrorSpan>{error}</ErrorSpan>}
      </td>
    </tr>
  );
}
