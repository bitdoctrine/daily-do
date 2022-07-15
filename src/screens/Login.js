import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then(() => {
      resetFields();
      navigate('/');
    });
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign In to Continue</h2>
      <label>
        <span>Email: </span>{' '}
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password: </span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {isPending && (
        <button disabled className="btn text-slate-100 bg-slate-700">
          Signing In...
        </button>
      )}
      {!isPending && (
        <button className="btn bg-slate-700 text-slate-100">Sign In</button>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
