import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404: Not Found</h1>
      <PrimaryButton onClick={() => navigate('/')}>Go home</PrimaryButton>
    </div>
  );
}

export default NotFound;
