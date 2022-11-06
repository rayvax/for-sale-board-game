import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enterRoom } from '../../api/rooms';
import { Room } from '../../models/room';
import { useToken } from '../../store/account/hooks';
import { getErrorMessage } from '../../utils/error';
import { PrimaryButton } from '../common/Button';

type RoomItemProps = {
  room: Room;
};

export function RoomItem({ room }: RoomItemProps) {
  const token = useToken();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleEnterRoom() {
    if (!token) {
      navigate('/');
      return;
    }

    if (room.hasPassword) {
      setError('Room has password');
      return;
    }

    try {
      const roomState = await enterRoom(token, room.code);
      dispatch();
    } catch (e) {
      console.error(e);
      setError(getErrorMessage(e));
    }
  }

  return (
    <tr>
      <td>{room.code}</td>
      <td>{room.admin}</td>
      <td>{room.hasPassword}</td>
      <td>
        <PrimaryButton>Enter room</PrimaryButton>
      </td>
    </tr>
  );
}
