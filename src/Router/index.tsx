import { createBrowserRouter, Outlet } from 'react-router-dom';
import Error from '../pages/Error';
import Screens from '../screens';
import Auth from '../Security/Auth';
import AuthPage from '../pages/Auth';
import App from '../pages/App';
import Home from '../pages/Home';

let Router = createBrowserRouter([
  {
    path: '/',
    element: <Screens />,
    children: [
      {
        path: '',
        element: <Outlet />,
        errorElement: <Error />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'auth',
            element: <AuthPage />,
          },
          {
            path: 'app/:id',
            element: <App />,
          },
          {
            path: '*',
            element: <Error />,
          },
        ],
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => Router.dispose());
}

export default Router;
