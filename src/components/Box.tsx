import React from 'react';

type SectionProps = {
  className?: string;
};

/**
 * 視覚的なグループ
 */
const Box: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <div
      className={`w-full p-4 bg-white rounded-lg ${className ?? ''}`}
    >
      {children}
    </div>
  );
};
export default Box;
