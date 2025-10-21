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
    className={`flex flex-col flex-1 justify-center items-center mx-4 md:mx-8 lg:mx-16 my-6 ${
      className ?? ''
    }`}
  >
    {children}
  </div>
);
export default Section;
