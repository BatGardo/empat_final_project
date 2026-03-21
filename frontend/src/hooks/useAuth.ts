import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckSessionQuery,
} from '../api/authApi';
import type { LoginInterface, RegisterInterface } from '../auth-schema/types';
import type { UseFormSetError } from 'react-hook-form';

export const useAuth = () => {
  const navigate = useNavigate();

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const { data: user, isLoading: isSessionChecking } = useCheckSessionQuery();

  const handleLogin = async (
    data: LoginInterface,
    setError: UseFormSetError<LoginInterface>,
  ) => {
    try {
      await loginMutation(data).unwrap();
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Authentification error';
      setError('root', { message: errorMessage });
    }
  };

  const handleRegister = async (
    data: Omit<RegisterInterface, 'confirm_password'>,
    setError: UseFormSetError<RegisterInterface>,
  ) => {
    try {
      await registerMutation(data).unwrap();
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Registration error';
      setError('root', { message: errorMessage });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isSessionChecking,
    isLoginLoading,
    isRegisterLoading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
