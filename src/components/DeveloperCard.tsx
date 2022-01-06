import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import Box from './Box';

type DeveloperCardProps = {
  icon?: ImportedImage;
  twitter?: string;
  name: string;
  charge: string;
  supplement?: string;
  className?: string;
};

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  icon,
  twitter,
  name,
  charge,
  supplement,
  className,
}) => {
  return (
    <Box className={className}>
      <div className='flex flex-col text-black gap-4'>
        <div className='flex justify-center items-end gap-4 h-16'>
          {icon == null ? (
            <></>
          ) : (
            <img src={icon as any} alt={`${name} icon`} className='flex-none h-16 bg-black rounded-[50%]' />
          )}
          <p className='text-3xl'>{name}</p>
          {twitter == null ? (
            <></>
          ) : (
            <a href={`https://twitter.com/${twitter}`} target='_blank' className='flex-none w-6'>
              <StaticImage
                src={`../images/twitter_logo_black.png`}
                alt={`${name} icon`}
                width={128}
                className='w-full'
              />
            </a>
          )}
        </div>
        <div>{charge}</div>
        <div>{supplement ?? '　'}</div>
      </div>
    </Box>
  );
};
export default DeveloperCard;
