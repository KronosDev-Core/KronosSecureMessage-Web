import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Auth: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
  let { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  if (id === '1') {
    return <>{children}</>;
  } else {
    setTimeout(() => {
      navigate('/auth');
    }, 5000);
    return <h1>Not Authenticated</h1>;
  }
};

export default Auth;
