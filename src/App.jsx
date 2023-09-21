import { Suspense, useEffect, useState } from 'react';
import './App.css';
import UserContext from './contexts/UserContext';
import UserList from './components/UserList';
import fetchUsers from './api/fetchUsers';

function App() {
  const [users, setUsers] = useState([]);

  const userContextProviderValue = {
    users,
  };

  /**
   * On inital component mount, we'll fetch the user list from the API.
  */
  useEffect(() => {
    fetchUsers().then((result) => {
      setUsers(result);
    });
  }, []);

  return (
    <UserContext.Provider value={userContextProviderValue}>
      <Suspense fallback={<h1>Fetching users...</h1>}>
        <UserList />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App
