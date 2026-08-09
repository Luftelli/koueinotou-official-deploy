import React from 'react';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * 論理的なグループ
 */
const Section: React.FC<SectionProps> = ({ children, className }) => (
  <div
    className={`mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-4 py-10 sm:px-6 md:py-14 lg:px-10 lg:py-16 xl:px-16 2xl:px-20 ${className ?? ''}`}
  >
    {children}
  </div>
);
export default Section;
