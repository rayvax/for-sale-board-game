import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenActive } from '../../api/account/api';
import { PrimaryButton } from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAppDispatch } from '../../hooks/redux';
import { clearAccountData } from '../../store/account/actions';
import { useToken } from '../../store/account/hooks';
import { loginPath, registerPath, roomsDashboardPath } from '../../utils/paths';

function HomePage() {
  const navigate = useNavigate();
  const token = useToken();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    (async function () {
      const isActive = await isTokenActive(token);

      if (!isActive) dispatch(clearAccountData());

      setIsLoading(false);
    })();
  }, [token]);

  return (
    <div>
      <h1>For sale!</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : token ? (
        <PrimaryButton onClick={() => navigate(roomsDashboardPath)}>
          Show rooms
        </PrimaryButton>
      ) : (
        <>
          <PrimaryButton onClick={() => navigate(loginPath)}>
            Login
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate(registerPath)}>
            Register
          </PrimaryButton>
        </>
      )}
    </div>
  );
}

export default HomePage;
