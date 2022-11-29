import { Room } from '../../../models/room';
import { RoomItem } from './RoomRow';

type RoomTableProps = {
  rooms: Room[];
};

export function RoomsTable({ rooms }: RoomTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <td>Code</td>
          <td>Admin</td>
          <td>Password</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <RoomItem key={room.code} room={room} />
        ))}
      </tbody>
    </table>
  );
}
