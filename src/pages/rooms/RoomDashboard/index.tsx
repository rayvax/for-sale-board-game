import { Plus } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useShowRooms } from '../../../api/rooms/hooks';
import { PrimaryButton } from '../../../components/common/Button';
import { createRoomPagePath } from '../../../utils/paths';
import { RoomTable } from './RoomTable';

function RoomsDashboard() {
  const rooms = useShowRooms();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Rooms</h1>
      {rooms && <RoomTable rooms={rooms} />}

      <PrimaryButton onClick={() => navigate(createRoomPagePath)}>
        <Plus /> Create room
      </PrimaryButton>
    </div>
  );
}

export default RoomsDashboard;
