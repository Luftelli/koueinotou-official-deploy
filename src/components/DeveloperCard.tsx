import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import Box from './Box';

type DeveloperCardProps = {
  icon?: string;
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
      <div className='flex flex-col text-black'>
        <div className='flex justify-center'>
          {icon == null ? <></> : <StaticImage src={`../images/${icon}`} alt={`${name} icon`} />}
          <p className='text-2xl'>{name}</p>
          {twitter == null ? (
            <></>
          ) : (
            <Link to={`https://twitter.com/${twitter}`} className='flex-none h-4 w-4'>
              <StaticImage src={`../images/twitter_logo_black.png`} alt={`${name} icon`} imgClassName=' object-contain' className='h-full w-full' />
            </Link>
          )}
        </div>
        <div>{charge}</div>
        <div>{supplement ?? '　'}</div>
      </div>
    </Box>
  );
};
export default DeveloperCard;
