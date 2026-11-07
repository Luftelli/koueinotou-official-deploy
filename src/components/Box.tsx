import React from 'react';

interface SectionProps {
  className?: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

/**
 * 視覚的なグループ
 * ゲームのInfoPanelと同じ黒いパネルで、下端にボタンと同じ虹色の線を引く
 */
const Box: React.FC<SectionProps> = ({ children, className, collapsed = false }) => {
  const additionalClassName = collapsed ? 'scale-y-0 h-0 py-0 overflow-hidden' : '';
  return (
    <div
      className={`panel-shadow relative w-full origin-top overflow-hidden transition-[height,padding,transform] duration-300 ${additionalClassName} ${className ?? ''}`}
    >
      <div className='relative p-5 sm:p-8 lg:p-10'>{children}</div>
      <span aria-hidden='true' className='light-bar' />
    </div>
  );
};
export default Box;
