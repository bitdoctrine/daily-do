import React, { useState } from 'react';
import './Signup.css';
import { motion } from 'framer-motion';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, error, isPending } = useSignup();

  const submitHandler = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail).then(() => {
      resetFields();
      navigate('/');
    });
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError('Please select a file to continue');
      setThumbnail(null);
      return;
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('Only Images are supported');
      setThumbnail(null);
      return;
    }

    if (selected.size > 1000000) {
      setThumbnailError('File must not be greater than 1mb');
      setThumbnail(null);
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
  };
  return (
    <form className="form rounded-lg" onSubmit={submitHandler}>
      <h2>Register</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>Username:</span>
        <input
          type="text"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Profile Picture:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && (
          <p className=" text-red-500 p-2 bg-red-200 mt-2 rounded-lg">
            {thumbnailError}
          </p>
        )}
      </label>
      {isPending && (
        <button className="btn text-slate-100 bg-slate-700">Loading...</button>
      )}
      {!isPending && (
        <motion.button
          whileTap={{ scale: '0.6' }}
          className="btn text-white transition-all duration-1000 ease-in bg-slate-700 p-2 rounded-md cursor-pointer "
        >
          Register
        </motion.button>
      )}

      {error && <p className="p-2 bg-red-200 text-red-600">{error}</p>}
    </form>
  );
};

export default Signup;
