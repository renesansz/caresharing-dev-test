import { useState } from "react";
import UserContext from "../contexts/UserContext";

const withUserContext = (WrappedComponent) => {
  const Component = (forwardedProps) => {
    const { contextInitialValue, ...componentProps } = forwardedProps;

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [getUserDataset, setUserDataset] = useState(() => {
      return [];
    });

    const userContextProviderValue = {
      users,
      setUsers,
      filteredUsers,
      setFilteredUsers,
      getUserDataset,
      setUserDataset,
      ...contextInitialValue
    };

    return (
      <UserContext.Provider value={userContextProviderValue}>
        <WrappedComponent {...componentProps} />
      </UserContext.Provider>
    )
  }

  Component.displayName = 'ComponentWithUserContext';

  return Component;
}

export default withUserContext;
