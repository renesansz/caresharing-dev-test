import { createContext } from "react";

const UserContext = createContext({
  users: [],
  filteredUsers: [],
  setFilteredUsers: () => {},
  getUserDataset: () => {},
});

export default UserContext;
