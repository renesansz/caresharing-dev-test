import { createContext } from "react";

const UserContext = createContext({
  users: [],
  filteredUsers: [],
  setFilteredUsers: () => {},
  getUserDataset: () => {},
  setUserDataset: () => {},
});

export default UserContext;
