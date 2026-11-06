import React from 'react';

/**
 * 新しいタブで開くことを示すアイコン
 */
const ExternalLinkIcon: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2.5}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
    className='h-[0.8em] w-[0.8em] flex-none'
  >
    <path d='M15 3h6v6' />
    <path d='M10 14 21 3' />
    <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
  </svg>
);
export default ExternalLinkIcon;
