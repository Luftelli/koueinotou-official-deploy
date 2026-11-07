import React from 'react';

interface MenuHeadingProps {
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * セクションの見出し
 * 見出しの下に、置かれた帯のチーム色の線を引く
 * ページの最初の見出し（h1）はどのチームにも属さないため、トップのキービジュアルの境界線と同じ虹色にする
 */
const MenuHeading: React.FC<MenuHeadingProps> = ({ as: Tag = 'h2', id, className, children }) => {
  const isPageTitle = Tag === 'h1';
  return (
    <div className={`menu-heading ${isPageTitle ? 'menu-heading-page' : ''} ${className ?? ''}`}>
      <Tag id={id} className='menu-heading-title'>
        {children}
      </Tag>
      {isPageTitle && <span aria-hidden='true' className='light-bar' />}
    </div>
  );
};
export default MenuHeading;
