import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, userType) => {
    setIsLoading(true);
    setError(null);

    const userData = { email, password, userType };

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        const json = await response.json();
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));
        // Dispatch login action
        dispatch({ type: 'LOGIN', payload: json });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
