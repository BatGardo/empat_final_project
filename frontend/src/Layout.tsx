import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  const linkBaseClass = 'transition hover:text-gray-600';
  const activeClass = 'text-black font-semibold';

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold">Baza Grunt Osnova</div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? activeClass : 'text-gray-500'}`
              }
            >
              Головна сторінка
            </NavLink>

            <NavLink
              to="/accounts"
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? activeClass : 'text-gray-500'}`
              }
            >
              Рахунки
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-gray-500">
          © 2026 Baza Grunt Osnova. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
