import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => (
  <footer className={`text-center text-base py-2 w-full ${className}`}>
    © Luftelli {new Date().getFullYear()}
  </footer>
);
export default Footer;
