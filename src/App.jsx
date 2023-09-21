import { Suspense, lazy, useContext, useEffect } from 'react';
import UserList from './components/UserList';

import './App.css';
import withUserContext from './hocs/withUserContext';
import fetchUsers from './api/fetchUsers';
import makeUserDataset from './utils/userDataChart';
import UserContext from './contexts/UserContext';

// NOTE: Let's lazy load this component since it has heavy dependencies.
const LazyDataChart = lazy(() => import("./components/DataChart"));

function App() {
    const { setUsers, setUserDataset } = useContext(UserContext);

    /**
     * On inital component mount, we'll fetch the user list from the API.
    */
    useEffect(() => {
      fetchUsers().then((result) => {
        setUsers(result);
        setUserDataset(() => {
          // NOTE: Generate seed data for fetching the user dataset later on the chart.
          return makeUserDataset(result);
        });
      });
    }, [setUsers, setUserDataset]);

  return (
    <>
      <Suspense fallback={<h1>Initializing chart...</h1>}>
        <LazyDataChart />
      </Suspense>
      <br />
      <Suspense fallback={<h1>Fetching users...</h1>}>
        <UserList />
      </Suspense>
    </>
  );
}

const AppWithContext = withUserContext(App);

export default AppWithContext;
