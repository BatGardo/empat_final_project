import LoginButton from '../login-button/LoginButton';
import SignupButton from '../signup-button/SIgnupButton';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="x-50 border-0.3 shadow-shadow sticky top-0 grid h-16 w-full grid-cols-2 border-y border-gray-200 bg-white px-5 lg:px-30">
      <div className="flex gap-3 self-center">
        <Link to="/">
          <img src="/Logo.svg" alt="Baza Grunt Osnova" className="h-9 w-9" />
        </Link>

        <h3 className="text-primary self-center text-base font-bold">
          <Link to="/">Baza Grunt Osnova</Link>
        </h3>
      </div>

      <div className="flex justify-end gap-3">
        <Link to="/login" className="self-center">
          <LoginButton />
        </Link>
        <Link to="/signup" className="self-center">
          <SignupButton />
        </Link>
      </div>
    </header>
  );
};

export default Header;
