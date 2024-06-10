import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Define userType state
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userType)
    await login(email, password, userType); // Pass userType to login function
    navigate("/")
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>User type</label>
      <div>
        <label>
          <input
            type='radio'
            name='userType'
            value='user'
            checked={userType === 'user'}
            onChange={(e) => setUserType(e.target.value)}
          />
          User
        </label>
        <label>
          <input
            type='radio'
            name='userType'
            value='author'
            checked={userType === 'author'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Author
        </label>
      </div>
      <label>Email</label>
      <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password</label>
      <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
