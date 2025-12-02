import { useEffect, useState } from 'react';

import { supabase } from '@/lib';

interface User {
  id: string;
  name: string;
}

export const UserHero = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from('users').select();
      setUsers(data as User[]);
    };

    getUsers();
  }, []);

  if (!users) return 'Cadastre um novo usuário';

  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
};
