import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ParallaxBackground from './ParallaxBackground';

interface LayoutProp {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProp> = ({ children }) => (
  <>
    <ParallaxBackground />
    <div className='flex min-h-screen flex-col font-body'>
      <Header className='flex-none' />
      <div className='flex flex-1'>
        <main className='flex min-w-0 w-full flex-1 flex-col items-center text-center'>{children}</main>
      </div>
      {/* 画面一番下に表示 */}
      <Footer className='flex-none' />
    </div>
  </>
);
export default Layout;
