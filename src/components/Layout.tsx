import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ParallaxBackground from './ParallaxBackground';

type LayoutProp = {
  pageTitle?: string;
  pageDescription?: string;
};

const Layout: React.FC<LayoutProp> = ({ children, pageTitle, pageDescription }) => (
  <>
    <ParallaxBackground />
    <div className='flex flex-col font-body min-h-screen'>
      <Header pageTitle={pageTitle} pageDescription={pageDescription} className='flex-none' />
      <div className='flex flex-1 justify-center'>
        <main className='flex flex-col flex-1 flex-wrap max-w-full justify-center text-center bg-black/[.7] lg:flex-nowrap lg:max-w-screen-lg'>
          {children}
        </main>
      </div>
      {/* 画面一番下に表示 */}
      <Footer className='flex-none' />
    </div>
  </>
);
export default Layout;
