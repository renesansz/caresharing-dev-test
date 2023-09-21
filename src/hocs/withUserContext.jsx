import { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext"
import makeUserDataset from "../utils/userDataChart";
import fetchUsers from "../api/fetchUsers";

const withUserContext = (WrappedComponent) => {
  const Component = (forwardedProps) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [getUserDataset, setGetUserDataset] = useState(() => {
      return [];
    });

    /**
     * On inital component mount, we'll fetch the user list from the API.
    */
    useEffect(() => {
      fetchUsers().then((result) => {
        setUsers(result);
        setGetUserDataset(() => {
          // NOTE: Generate seed data for fetching the user dataset later on the chart.
          return makeUserDataset(result);
        });
      });
    }, []);

    const userContextProviderValue = {
      users,
      filteredUsers,
      setFilteredUsers,
      getUserDataset
    };

    return (
      <UserContext.Provider value={userContextProviderValue}>
        <WrappedComponent {...forwardedProps} />
      </UserContext.Provider>
    )
  }

  Component.displayName = 'ComponentWithUserContext';

  return Component;
}

export default withUserContext;
