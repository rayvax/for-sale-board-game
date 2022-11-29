import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/Button';
import { useToken } from '../../store/account/hooks';
import { loginPath, roomsDashboardPath } from '../../utils/paths';

function HomePage() {
  const navigate = useNavigate();

  const token = useToken();

  return (
    <div>
      <h1>For sale!</h1>
      {token ? (
        <PrimaryButton onClick={() => navigate(roomsDashboardPath)}>
          Show rooms
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => navigate(loginPath)}>Login</PrimaryButton>
      )}
    </div>
  );
}

export default HomePage;
