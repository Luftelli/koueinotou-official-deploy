import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className = '' }) => (
  // ページタイトルが指定されない場合はトップページとする
  <header className={className}>
    <nav className='flex justify-center w-full py-2'>
      <div className='flex flex-grow max-w-screen-lg px-4 justify-between'>
        <Link to='/' className='tooltip' data-tip='トップページへ'>
          <StaticImage src='../images/ctm_logo_v1.png' height={32} alt='トップページへ' />
        </Link>
        <a href='https://luftelli.com' className='tooltip' data-tip='サークルページへ'>
          <p className='flex-none text-base'>Luftelli</p>
        </a>
      </div>
    </nav>
  </header>
);
export default Header;
