import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { tokenStorage } from './token/tokenStorage';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    tokenStorage.remove();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/Logo.svg" alt="Baza Grunt Osnova" className="h-9 w-9" />
            <span className="hidden text-base font-semibold text-gray-900 md:block">
              Baza Grunt Osnova
            </span>
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/dashboard" className="text-sm font-medium text-gray-700 transition hover:text-gray-900">
              Dashboard
            </NavLink>
            <NavLink to="/profile" className="text-sm font-medium text-gray-700 transition hover:text-gray-900">
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#3d3d5e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f2f4a]"
            >
              Log out
            </button>
          </nav>

          <button
            className="text-gray-600 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <img src="/icons/close.svg" alt="Close menu" />
            ) : (
              <img src="/icons/hamburger.svg" alt="Open menu" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-[57px] left-0 z-50 flex w-full flex-col gap-3 bg-white p-4 shadow-lg md:hidden">
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="flex h-12 w-full items-center justify-between rounded-lg bg-gray-50 px-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/profile')}
              className="flex h-12 w-full items-center justify-between rounded-lg bg-gray-50 px-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#3d3d5e] text-sm font-semibold text-white transition hover:bg-[#2f2f4a]"
            >
              Log out
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
