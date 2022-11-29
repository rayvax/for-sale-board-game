import { useEffect, useState } from 'react';
import { ResponseRoom, showRooms } from './api';
import { useAppDispatch } from '../../hooks/redux';
import { Room } from '../../models/room';
import { useToken } from '../../store/account/hooks';
import { setStoreError } from '../../store/error/actions';
import { getErrorMessage } from '../../utils/error';

function responseToRooms(response: ResponseRoom): Room[] {
  return response.code.map((code, i) => ({
    code,
    admin: {
      login: response.adminLogin[i],
      nickname: response.adminNickname[i],
    },
    hasPassword: response.hasPassword[i] === 1,
  }));
}

export function useShowRooms() {
  const token = useToken();
  const dispatch = useAppDispatch();
  const [rooms, setRooms] = useState<Room[] | null>();

  useEffect(() => {
    if (!token) return;

    (async function () {
      try {
        const resp = await showRooms(token);

        setRooms(responseToRooms(resp));
      } catch (e: any) {
        const message = getErrorMessage(e);
        console.error(message);
        dispatch(setStoreError({ message }));
      }
    })();
  }, [token, dispatch]);

  return rooms;
}
