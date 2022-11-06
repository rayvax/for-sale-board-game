import { Room } from '../../models/room';
import { RoomItem } from './RoomRow';

type RoomTableProps = {
  rooms: Room[];
};

export function RoomTable({ rooms }: RoomTableProps) {
  return (
    <table>
      <tr>
        <td>Code</td>
        <td>Admin</td>
        <td>Password</td>
        <td></td>
      </tr>
      {rooms.map((room) => (
        <RoomItem key={room.code} room={room} />
      ))}
    </table>
  );
}
