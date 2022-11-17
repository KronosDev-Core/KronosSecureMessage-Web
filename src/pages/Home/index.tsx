import { FC } from "react";
import { useNavigate } from "react-router-dom";


const Home: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/auth');

  return (<>
  <h1>Home</h1>
  <button onClick={handleLogin}>Login</button>
</>)}

export default Home;