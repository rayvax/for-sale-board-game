import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../constants/theme';
import Login from './Login';
import Register from './Register';

const AccountPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const ContentWrapper = styled.div`
  min-width: 700px;
  min-height: 500px;
  margin: 0 auto;

  background-color: ${colors.bg1};

  border: 3px solid ${colors.bg2};
  border-radius: 20px;
`;

export const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const AccountLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function AccountPage() {
  return (
    <AccountPageWrapper>
      <ContentWrapper>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to={'/account/login'} />} />
        </Routes>
      </ContentWrapper>
    </AccountPageWrapper>
  );
}

export default AccountPage;
