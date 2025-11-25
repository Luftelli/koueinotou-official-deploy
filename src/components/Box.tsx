import React from 'react';

interface SectionProps {
  className?: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

/**
 * 視覚的なグループ
 */
const Box: React.FC<SectionProps> = ({ children, className, collapsed = false }) => {
  const additionalClassName = collapsed ? 'scale-y-0 h-0 py-0 overflow-hidden' : '';
  return (
    <div className={`w-full relative group origin-top ${additionalClassName} ${className ?? ''}`}>
      {/* Background and Shape */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm shadow-lg' />
        {/* Rainbow Line */}
        <div
          className='absolute bottom-0 left-0 right-0 h-0.5 animate-rainbow-scroll'
          style={{
            background:
              'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #0000ff, #8b00ff, #ff0000)',
            backgroundSize: '600% 100%',
          }}
        />
        {/* Bloom Effect */}
        <div
          className='absolute bottom-0 left-0 right-0 h-2 blur-md opacity-80 animate-rainbow-scroll'
          style={{
            background:
              'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #0000ff, #8b00ff, #ff0000)',
            backgroundSize: '600% 100%',
            transform: 'translateY(25%)',
          }}
        />
      </div>

      {/* Content */}
      <div className='relative p-8 md:px-16'>{children}</div>
    </div>
  );
};
export default Box;
