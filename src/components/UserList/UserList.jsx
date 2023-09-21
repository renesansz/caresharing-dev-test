import { useContext } from "react";

import UserContext from "@/contexts/UserContext";

export default function UserList() {
  const { users } = useContext(UserContext);

  return (
    <ul>
      {users.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
