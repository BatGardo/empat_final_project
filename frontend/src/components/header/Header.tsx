import LoginButton from '../login-button/LoginButton';
import SignupButton from '../signup-button/SignupButton';
import LogoutButton from '../logout-button/LogoutButton';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigation = (path: string) => {
    closeMenu();
    navigate(path);
  };

  return (
    <header className="shadow-shadow border-0.3 sticky top-0 z-50 border-y border-gray-200 bg-white">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-2 px-5 md:px-8">
        {/*Logo*/}
        <div
          className="flex cursor-pointer gap-3 self-center"
          onClick={() => handleNavigation('/')}
        >
          <img src="/Logo.svg" alt="Baza Grunt Osnova" className="h-9 w-9" />
          <h3 className="text-primary hidden self-center text-base font-bold md:flex">
            Baza Grunt Osnova
          </h3>
        </div>

        {/*Menu desktop*/}
        <div className="hidden justify-end md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="font-headings text-headings hover:text-primary font-semibold transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation('/profile')}
                className="font-headings text-headings hover:text-primary font-semibold transition-colors"
              >
                Profile
              </button>
              <LogoutButton className="bg-primary hover:bg-hover-violet rounded-full px-5 py-2 font-medium text-white transition-colors" />
            </div>
          ) : (
            <div className="my-2.5 flex items-center gap-3">
              <LoginButton />
              <SignupButton />
            </div>
          )}
        </div>

        {/*Hamburger menu*/}
        <button
          className="text-text-secondary justify-self-end md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <img src="icons/close.svg" alt="Close menu" />
          ) : (
            <img src="icons/hamburger.svg" alt="Open menu" />
          )}
        </button>
      </div>

      {/*Mobile menu*/}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 z-50 flex w-full flex-col gap-4 bg-white p-5 shadow-lg md:hidden">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="text-text-default flex h-12 w-full items-center justify-between rounded-lg bg-gray-50 px-4 font-bold hover:bg-gray-100"
              >
                Dashboard
                <img
                  src="/icons/chevron.svg"
                  alt="Go"
                  className="-rotate-90 opacity-50"
                />
              </button>
              <button
                onClick={() => handleNavigation('/profile')}
                className="font-headings text-headings flex h-12 w-full items-center justify-between rounded-lg bg-gray-50 px-4 text-lg font-bold hover:bg-gray-100"
              >
                Profile
                <img
                  src="/icons/chevron.svg"
                  alt="Go"
                  className="-rotate-90 opacity-50"
                />
              </button>
              <LogoutButton
                onAction={closeMenu}
                className="bg-primary hover:bg-hover-violet flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold text-white transition-colors"
              />
            </>
          ) : (
            <>
              <LoginButton
                onAction={closeMenu}
                className="text-text-default flex h-12 w-full items-center justify-between rounded-lg bg-gray-50 px-4 font-bold hover:bg-gray-100"
              />
              <SignupButton
                onAction={closeMenu}
                className="bg-primary hover:bg-hover-violet flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold text-white transition-colors"
              />
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
