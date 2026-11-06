import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';
import ExternalLinkIcon from './ExternalLinkIcon';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => (
  <footer
    className={`mt-12 w-full border-t border-white/10 bg-slate-900/60 px-4 py-6 text-center text-sm tracking-wider text-slate-400 backdrop-blur-lg ${className}`}
  >
    <nav aria-label='補助ナビゲーション' className='mb-4 flex justify-center gap-6'>
      <OutboundLink
        href='https://luftelli.com/contact'
        target='_blank'
        className='inline-flex items-center gap-1 text-xs transition-colors duration-200 hover:text-cyan-200 sm:text-sm'
      >
        お問い合わせ
        <ExternalLinkIcon />
        <span className='sr-only'>（新しいタブで開く）</span>
      </OutboundLink>
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
