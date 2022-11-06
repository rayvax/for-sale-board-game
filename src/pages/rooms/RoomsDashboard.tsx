import { useShowRooms } from '../../api/rooms/hooks';
import { ErrorSpan } from '../../components/common/Span';
import { RoomTable } from '../../components/rooms/RoomTable';

function RoomsDashboard() {
  const { rooms, error } = useShowRooms();

  return (
    <div>
      <h1>Rooms</h1>
      {error && <ErrorSpan>{error}</ErrorSpan>}
      {rooms && <RoomTable rooms={rooms} />}
    </div>
  );
}

export default RoomsDashboard;
