import { useState } from 'react';
import { Plus } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useShowRooms } from '../../../api/rooms/hooks';
import { PrimaryButton } from '../../../components/common/Button';
import { createRoomPagePath } from '../../../utils/paths';
import { PasswordModal } from './PasswordModal';
import { RoomsTable } from './RoomsTable';

type PasswordModalData = {
  isOpen: boolean;
  roomCode: string;
};

const defaultPasswordModalData: PasswordModalData = {
  isOpen: false,
  roomCode: '',
};

function RoomsDashboard() {
  const rooms = useShowRooms();
  const navigate = useNavigate();
  const [passwordModalData, setPasswordModalData] = useState(
    defaultPasswordModalData,
  );

  return (
    <div>
      <h1>Rooms</h1>
      <PrimaryButton onClick={() => navigate(createRoomPagePath)}>
        <Plus /> Create room
      </PrimaryButton>
      {rooms && (
        <RoomsTable
          rooms={rooms}
          openPasswordModal={(roomCode) =>
            setPasswordModalData({ isOpen: true, roomCode })
          }
        />
      )}
      {passwordModalData.isOpen && (
        <PasswordModal
          roomCode={passwordModalData.roomCode}
          closeModal={() => setPasswordModalData(defaultPasswordModalData)}
        />
      )}
    </div>
  );
}

export default RoomsDashboard;
