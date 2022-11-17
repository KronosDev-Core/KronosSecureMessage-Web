import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Core: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => (
  <>
    {children}
  </>
);

export default Core;
