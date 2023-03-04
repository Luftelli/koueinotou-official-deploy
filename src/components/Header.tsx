import React from 'react';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className = '' }) => (
  // ページタイトルが指定されない場合はトップページとする
  <header className={className}>
    <nav className='flex justify-center w-full py-2'>
      <div className='flex flex-grow max-w-screen-lg px-4'>
        <a href='https://luftelli.com'>
          <p className='flex-none text-base'>Luftelli</p>
        </a>
      </div>
    </nav>
  </header>
);
export default Header;
