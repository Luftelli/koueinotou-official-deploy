import React from 'react';

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`text-center text-base py-2 mt-6 border-t-2 w-full ${className}`}>
      © Luftelli {new Date().getFullYear()}
    </footer>
  );
};
export default Footer;
