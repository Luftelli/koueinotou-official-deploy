import { Link } from 'gatsby';
import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => (
  <footer
    className={`mt-12 w-full border-t border-white/10 bg-slate-900/60 px-4 py-6 text-center text-sm tracking-wider text-slate-400 backdrop-blur-lg ${className}`}
  >
    <nav aria-label='補助ナビゲーション' className='mb-4'>
      <Link
        to='/policies'
        className='text-xs transition-colors duration-200 hover:text-cyan-200 sm:text-sm'
      >
        規約・方針
      </Link>
    </nav>
    <p>© Luftelli {new Date().getFullYear()}</p>
  </footer>
);
export default Footer;
