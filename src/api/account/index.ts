import { runProcedure } from '..';

type AccountResponse = {
  RESULTS: [{ token: [string] }];
};

function unfoldAccountResponse(response: AccountResponse) {
  if (!response.RESULTS[0].token || !response.RESULTS[0].token[0]) return null;

  return response.RESULTS[0].token[0];
}

export async function logIntoAccount(login: string, password: string) {
  const response = await runProcedure<AccountResponse>('login', {
    param1: login,
    param2: password,
  });

  return unfoldAccountResponse(response);
}

export async function registerAccount(nickname: string, login: string, password: string) {
  const response = await runProcedure<AccountResponse>('register', {
    param1: nickname,
    param2: login,
    param3: password,
  });

  return unfoldAccountResponse(response);
}
