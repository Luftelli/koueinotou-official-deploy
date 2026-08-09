import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => (
  // ページタイトルが指定されない場合はトップページとする
  <header
    className={`sticky top-0 z-50 overflow-x-hidden border-b border-cyan-300/10 bg-slate-900/70 shadow-lg shadow-black/10 backdrop-blur-xl sm:overflow-x-visible ${className}`}
  >
    <nav className='flex w-full justify-center py-3'>
      <div className='flex w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20'>
        <Link
          to='/'
          className='tooltip transition-opacity duration-200 hover:opacity-80'
          data-tip='トップページへ'
        >
          <StaticImage src='../images/ctm_logo_v1.png' height={32} alt='トップページへ' />
        </Link>
        <OutboundLink
          href='https://luftelli.com'
          className='tooltip'
          data-tip='サークルページへ'
        >
          <p className='flex-none text-base'>Luftelli</p>
        </OutboundLink>
      </div>
    </nav>
  </header>
);
export default Header;
