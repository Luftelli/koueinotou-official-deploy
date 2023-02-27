import React from 'react';

type SectionProps = {
  className?: string;
  collapsed?: boolean;
};

/**
 * 視覚的なグループ
 */
const Box: React.FC<SectionProps> = ({ children, className, collapsed = false }) => {
  const additionalClassName = collapsed ? 'scale-y-0 h-0 py-0 overflow-hidden' : '';
  return (
    <div
      className={`w-full p-4 bg-gray-900 border border-teal-200 rounded-lg origin-top transform-gpu ${additionalClassName} ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
};
export default Box;
