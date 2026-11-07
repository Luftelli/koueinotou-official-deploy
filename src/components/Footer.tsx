import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';
import ExternalLinkIcon from './ExternalLinkIcon';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => (
  <footer
    className={`relative mt-12 w-full bg-black px-4 pb-6 pt-7 text-center text-sm tracking-wider text-ink-dim ${className}`}
  >
    <span aria-hidden='true' className='light-bar light-bar-top' />
    <nav aria-label='補助ナビゲーション' className='mb-4 flex justify-center gap-6'>
      <OutboundLink
        href='https://luftelli.com/contact'
        target='_blank'
        className='inline-flex items-center gap-1 text-xs underline-offset-4 transition-colors duration-200 hover:text-white hover:underline sm:text-sm'
      >
        お問い合わせ
        <ExternalLinkIcon />
        <span className='sr-only'>（新しいタブで開く）</span>
      </OutboundLink>
      <Link
        to='/policies'
        className='text-xs underline-offset-4 transition-colors duration-200 hover:text-white hover:underline sm:text-sm'
      >
        規約・方針
      </Link>
    </nav>
    <p>
      © <span translate='no'>Luftelli</span> {new Date().getFullYear()}
    </p>
  </footer>
);
export default Footer;
