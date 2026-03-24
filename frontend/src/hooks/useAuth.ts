import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckSessionQuery,
  authApi,
} from '../api/authApi';
import { setToken, clearToken } from '../store/slices/authSlice';
import type { LoginInterface, RegisterInterface } from '../auth-schema/types';
import type { UseFormSetError } from 'react-hook-form';
import type { RootState } from '../store/store';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logout] = useLogoutMutation();

  const { data: user, isLoading: isSessionChecking } = useCheckSessionQuery(
    undefined,
    {
      skip: !token,
    },
  );

  const redirectPath = location.state?.from || '/';

  const handleLogin = async (
    data: LoginInterface,
    setError: UseFormSetError<LoginInterface>,
  ) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setToken(response.token));
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Authentication error';
      setError('root', { message: errorMessage });
    }
  };

  const handleRegister = async (
    data: RegisterInterface,
    setError: UseFormSetError<RegisterInterface>,
  ) => {
    try {
      const response = await register(data).unwrap();
      dispatch(setToken(response.token));
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Registration error';
      setError('root', { message: errorMessage });
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearToken());
      dispatch(authApi.util.resetApiState());
      navigate('/');
    }
  };

  return {
    user,
    isAuthenticated: !!token && !!user,
    isSessionChecking,
    isLoginLoading,
    isRegisterLoading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
