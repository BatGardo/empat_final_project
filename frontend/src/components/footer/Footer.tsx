import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-primary flex h-[90px] items-center px-5 text-base text-white md:px-30">
      <div className="mx-auto w-full max-w-7xl">
        <Link to="/">©2026 Baza Grunt Osnova</Link>
      </div>
    </footer>
  );
};

export default Footer;
