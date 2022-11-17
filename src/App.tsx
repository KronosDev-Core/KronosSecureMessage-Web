import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import Core from './core';
import Screens from './screens';
import Router from './Router';

const App: FC = (): JSX.Element => (
  <Core>
    <RouterProvider router={Router} fallbackElement={<></>} />
  </Core>
);

export default App;
