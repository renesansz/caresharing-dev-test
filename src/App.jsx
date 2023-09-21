import { Suspense, lazy } from 'react';
import UserList from './components/UserList';

import './App.css';
import withUserContext from './hocs/withUserContext';

// NOTE: Let's lazy load this component since it has heavy dependencies.
const LazyDataChart = lazy(() => import("./components/DataChart"));

function App() {
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
