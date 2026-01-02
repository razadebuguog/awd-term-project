'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const base =
    'px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150';

  const linkClass = (href) =>
    pathname === href
      ? `${base} bg-[#06B6D4] text-white dark:text-[#1E293B] shadow-md shadow-[#06B6D4]/40`
      : `${base} text-[#1E293B] dark:text-[#F9FAFB] hover:bg-[#06B6D4]/10 dark:hover:bg-[#06B6D4]/20`;

  return (
    <header className="fixed w-full z-50 p-4 bg-[#F9FAFB]/95 dark:bg-[#0F172A]/95 shadow-xl dark:shadow-[#0F172A]/50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#1E293B] dark:text-[#F9FAFB]"
        >
          UniConvert
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/services" className={linkClass('/services')}>
            Services
          </Link>
          <Link href="/about" className={linkClass('/about')}>
            About
          </Link>
          <Link href="/contact" className={linkClass('/contact')}>
            Contact
          </Link>
          <Link href="/dashboard" className={linkClass('/dashboard')}>
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex space-x-2">
            <Link href="/login" className={linkClass('/login')}>
              Login
            </Link>
            <Link href="/register" className={linkClass('/register')}>
              Register
            </Link>
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
