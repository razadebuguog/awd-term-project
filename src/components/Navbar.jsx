import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const linkBaseClasses =
    'px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150';

  const getNavLinkClasses = ({ isActive }) => {
    if (isActive) {
      return (
        linkBaseClasses +
        ' bg-[#06B6D4] text-white dark:text-[#1E293B] shadow-md shadow-[#06B6D4]/40'
      );
    }
    return (
      linkBaseClasses +
      ' text-[#1E293B] dark:text-[#F9FAFB] hover:bg-[#06B6D4]/10 dark:hover:bg-[#06B6D4]/20'
    );
  };

  return (
    <header className="fixed w-full z-50 p-4 bg-[#F9FAFB]/95 dark:bg-[#0F172A]/95 shadow-xl dark:shadow-[#0F172A]/50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#1E293B] dark:text-[#F9FAFB]"
        >
          UniConvert
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={getNavLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/services" className={getNavLinkClasses}>
            Services
          </NavLink>
          <NavLink to="/about" className={getNavLinkClasses}>
            About
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClasses}>
            Contact
          </NavLink>
          <NavLink to="/dashboard" className={getNavLinkClasses}>
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex space-x-2">
            <NavLink to="/login" className={getNavLinkClasses}>
              Login
            </NavLink>
            <NavLink to="/register" className={getNavLinkClasses}>
              Register
            </NavLink>
          </div>

          <button
            onClick={toggleTheme}
            className="p-3 rounded-full text-[#1E293B] dark:text-[#F9FAFB] hover:bg-[#06B6D4]/20 transition duration-150"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
