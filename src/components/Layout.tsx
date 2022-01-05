import React from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProp = {
  pageTitle?: string;
  pageDescription?: string;
};

const Layout: React.FC<LayoutProp> = ({ children, pageTitle, pageDescription }) => {
  return (
    <div className='flex flex-col font-body bg-gradient-to-b from-black to-black min-h-screen'>
      <Header pageTitle={pageTitle} pageDescription={pageDescription} className='flex-none' />
      <div className='flex flex-1 justify-center mx-4 lg:mx-0'>
        <div className='flex flex-1 flex-wrap max-w-full lg:flex-nowrap lg:max-w-screen-lg'>
          <div className='flex-none w-full lg:flex-auto'>
            <main>{children}</main>
          </div>
        </div>
      </div>
      {/* 画面一番下に表示 */}
      <Footer className='flex-none' />
    </div>
  );
};
export default Layout;
