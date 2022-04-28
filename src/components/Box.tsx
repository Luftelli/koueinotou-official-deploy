import React from 'react';

type SectionProps = {
  className?: string;
};

/**
 * 視覚的なグループ
 */
const Box: React.FC<SectionProps> = ({ children, className }) => (
    <div className={`w-full p-4 bg-gray-900 border border-teal-200 rounded-lg ${className ?? ''}`}>
      {children}
    </div>
  );
export default Box;
