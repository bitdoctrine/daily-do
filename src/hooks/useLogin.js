import { useState, useEffect } from 'react';
import { auth, storage } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await auth.signInWithEmailAndPassword(email, password);

      //update user online status

      await storage
        .collection('users')
        .doc(res.user.uid)
        .update({ online: true });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });
      setIsPending(false);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
