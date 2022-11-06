import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/Button';
import { useToken } from '../../store/account/hooks';

function HomePage() {
  const navigate = useNavigate();

  const token = useToken();

  return (
    <div>
      <h1>For sale!</h1>
      {token ? (
        <PrimaryButton onClick={() => navigate('/rooms/')}>Show rooms</PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => navigate('/account/login')}>Login</PrimaryButton>
      )}
    </div>
  );
}

export default HomePage;
