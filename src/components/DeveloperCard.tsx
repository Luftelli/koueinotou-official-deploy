import React from 'react';
import Box from './Box';

interface DeveloperCardProps {
  icon?: ImportedImage;
  xAccount?: string;
  name: string;
  charge: string;
  supplement?: string;
  className?: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  icon,
  xAccount,
  name,
  charge,
  supplement,
  className,
}) => (
  <Box className={className}>
    <div className='flex flex-col gap-4'>
      <div className='flex justify-center items-end gap-4 h-16'>
        {icon == null ? undefined : (
          <img src={icon} alt={`${name} icon`} className='flex-none h-16 bg-black rounded-[50%]' />
        )}
        <p className='text-3xl'>{name}</p>
        {xAccount == null ? undefined : (
          <a
            href={`https://x.com/${xAccount}`}
            target='_blank'
            className='flex-none w-6'
            rel='noreferrer'
            aria-label={`${name}のX（新しいタブで開く）`}
          >
            <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-full'>
              <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
            </svg>
          </a>
        )}
      </div>
      <div>{charge}</div>
      <div>{supplement ?? ''}</div>
    </div>
  </Box>
);
export default DeveloperCard;
