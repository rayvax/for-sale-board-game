import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AccountForm, AccountLabel } from '.';
import { logIntoAccount } from '../../api/account';
import { PrimaryButton } from '../../components/common/Button';
import { ErrorSpan } from '../../components/common/Span';
import { useAppDispatch } from '../../hooks/redux';
import { setToken } from '../../store/account/actions';
import { useToken } from '../../store/account/hooks';
import { getErrorMessage } from '../../utils/error';

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type LoginInputData = {
  login: string;
  password: string;
};
const initialLoginInputData: LoginInputData = {
  login: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginInputData>(initialLoginInputData);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const token = await logIntoAccount(loginData.login, loginData.password);

      setError(null);
      dispatch(setToken({ token }));
      navigate('/rooms/');
    } catch (e) {
      console.error(e);
      setError(getErrorMessage(e));
    }
  }

  return (
    <LoginWrapper>
      <h1>Sign in</h1>
      <AccountForm onSubmit={handleSubmit}>
        <AccountLabel>
          Login:
          <input
            type={'text'}
            id='login'
            name='login'
            value={loginData.login}
            onChange={handleInputChange}
          />
        </AccountLabel>
        <AccountLabel>
          Password:
          <input
            type={'text'}
            id='password'
            name='password'
            value={loginData.password}
            onChange={handleInputChange}
          />
        </AccountLabel>
        <PrimaryButton type='submit'>Submit</PrimaryButton>
        {error && <ErrorSpan>{error}</ErrorSpan>}
      </AccountForm>
    </LoginWrapper>
  );
}

export default Login;
