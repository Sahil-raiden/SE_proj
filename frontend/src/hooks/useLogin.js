import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password, userType) => {
    setIsLoading(true);
    setError(null);

    const userData = { email, password, userType };

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      // Dispatch login action
      dispatch({ type: 'LOGIN', payload: json });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
