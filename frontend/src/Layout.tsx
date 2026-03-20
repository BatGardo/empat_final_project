import { Outlet, NavLink } from 'react-router-dom';
const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/Logo.svg" alt="Baza Grunt Osnova" className="h-9 w-9" />
            <span className="text-base font-semibold text-gray-900">
              Baza Grunt Osnova
            </span>
          </NavLink>

          <nav className="flex items-center gap-6">
            <NavLink to="/" className="text-sm font-medium text-gray-700 transition hover:text-gray-900">
              Dashboard
            </NavLink>
            <NavLink to="/accounts" className="text-sm font-medium text-gray-700 transition hover:text-gray-900">
              Profile
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
