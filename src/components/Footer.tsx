import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => (
  <footer
    className={`mt-12 w-full border-t border-white/10 bg-slate-900/60 px-4 py-6 text-center text-sm tracking-wider text-slate-400 backdrop-blur-lg ${className}`}
  >
    © Luftelli {new Date().getFullYear()}
  </footer>
);
export default Footer;
