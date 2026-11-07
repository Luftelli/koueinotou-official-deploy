import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';

interface DeveloperCardProps {
  icon?: ImportedImage;
  xAccount?: string;
  name: string;
  charge: string;
  supplement?: string;
  className?: string;
}

/**
 * 開発者の1行
 */
const DeveloperCard: React.FC<DeveloperCardProps> = ({
  icon,
  xAccount,
  name,
  charge,
  supplement,
  className,
}) => (
  <div className={`flex items-center gap-4 border-b border-rule py-4 text-left ${className ?? ''}`}>
    {icon == null ? (
      <span
        aria-hidden='true'
        className='team-mark h-[3.9rem] w-[4.5rem] flex-none bg-ink text-2xl font-medium text-paper'
      >
        {name.charAt(0)}
      </span>
    ) : (
      <img
        src={icon}
        alt=''
        width={72}
        height={62}
        loading='lazy'
        className='team-mark h-[3.9rem] w-[4.5rem] flex-none bg-black'
      />
    )}
    <div className='min-w-0 flex-1'>
      <p translate='no' className='text-2xl font-medium'>
        {name}
      </p>
      <p className='mt-1 text-ink-dim'>{charge}</p>
      {supplement != null && <p className='text-ink-dim'>{supplement}</p>}
    </div>
    {xAccount != null && (
      <OutboundLink
        href={`https://x.com/${xAccount}`}
        target='_blank'
        rel='noreferrer'
        className='w-6 flex-none transition-opacity duration-200 hover:opacity-70'
        aria-label={`${name}のX（新しいタブで開く）`}
      >
        <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-full'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
        </svg>
      </OutboundLink>
    )}
  </div>
);
export default DeveloperCard;
