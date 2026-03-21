import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import type { LoginInterface } from '../auth-schema/types';
import Input from '../components/input/Input';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../auth-schema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(loginSchema),
  });

  const { handleLogin, isLoginLoading } = useAuth();

  const submitForm = async (data: LoginInterface) => {
    await handleLogin(data, setError);
    if (!errors.root) {
      reset();
    }
  };

  return (
    <>
      <Header />

      <div className="font-text-default grid h-[calc(100vh-64px-90px)] content-center px-5 text-center lg:px-30">
        <div className="mb-6 flex justify-center space-x-[42px]">
          <img src="/Logo.svg" alt="Baza Grunt Osnova" className="h-9 w-9" />
        </div>

        <div className="text-2xl font-bold lg:text-[32px]">
          <h1 className="pb-4">Your travel organizer</h1>

          <p className="text-text-secondary">
            Log in to your
            <br />
            Baza Grunt Osnova account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="mt-6 w-[280px] justify-self-center text-base lg:w-[350px]"
        >
          <Input
            label="Email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
            {...register('password')}
          />

          <button
            type="submit"
            disabled={isLoginLoading}
            className="font-nunito bg-primary hover:bg-hover-violet h-10 w-full justify-center rounded-lg text-base text-white"
          >
            Continue
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
