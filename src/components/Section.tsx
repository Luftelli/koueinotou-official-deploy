import React from 'react';

type SectionProps = {
  className?: string;
};

/**
 * 論理的なグループ
 */
const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col flex-1 justify-center items-center mx-16 my-6 ${className ?? ''}`}
    >
      {children}
    </div>
  );
};
export default Section;
