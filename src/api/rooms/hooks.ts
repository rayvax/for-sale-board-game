import { useEffect, useState } from 'react';
import { ResponseRoom, showRooms } from '.';
import { Room } from '../../models/room';
import { useToken } from '../../store/account/hooks';

function responseToRooms(response: ResponseRoom): Room[] {
  return response.code.map((code, i) => ({
    code,
    admin: response.admin[i],
    hasPassword: response.hasPassword[i] === 1,
  }));
}

export function useShowRooms() {
  const token = useToken();
  const [rooms, setRooms] = useState<Room[] | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    (async function () {
      try {
        const resp = await showRooms(token);

        setRooms(responseToRooms(resp));
      } catch (e: any) {
        setError(e);
      }
    })();
  }, [token]);

  return { rooms, error };
}
