import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import MotionToggle from './MotionToggle';

interface HeaderProps {
  className?: string;
}

const navItems = [
  { to: '/game-details', label: 'ゲーム紹介' },
  { to: '/development-status', label: '開発状況' },
] as const;

const Header: React.FC<HeaderProps> = ({ className = '' }) => (
  // ページタイトルが指定されない場合はトップページとする
  <header
    className={`sticky top-0 z-50 overflow-x-hidden bg-black pb-1 sm:overflow-x-visible ${className}`}
  >
    <nav aria-label='メインナビゲーション' className='flex w-full justify-center py-3'>
      <div className='flex w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20'>
        <div className='flex items-center gap-3 sm:gap-8'>
          <Link
            to='/'
            className='tooltip transition-opacity duration-200 hover:opacity-80'
            data-tip='トップページへ'
          >
            <StaticImage src='../images/ctm_logo_v1.png' height={32} alt='トップページへ' />
          </Link>
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className='text-sm font-bold text-white decoration-2 underline-offset-[6px] hover:underline sm:text-base'
              activeClassName='underline'
              partiallyActive
            >
              {label}
            </Link>
          ))}
        </div>
        <div className='flex flex-none items-center gap-3 sm:gap-6'>
          <MotionToggle />
          <OutboundLink
            href='https://luftelli.com'
            // 画面の右端にあるため、ツールチップは左側に出してはみ出さないようにする
            className='tooltip tooltip-left text-base decoration-2 underline-offset-[6px] hover:underline max-[359px]:hidden'
            data-tip='サークルページへ'
            translate='no'
          >
            Luftelli
          </OutboundLink>
        </div>
      </div>
    </nav>
    <span aria-hidden='true' className='light-bar' />
  </header>
);
export default Header;
