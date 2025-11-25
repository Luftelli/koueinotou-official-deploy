import { Link } from 'gatsby';
import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

interface ButtonProps {
  link?: string;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, link, className }) => {
  // https://やhttp://を含まないなら内部コンテンツとする
  const isInternal = link == null ? false : !link.includes('://');

  const mainComponent = (
    <div
      className={`flex justify-center items-center text-2xl text-white font-bold align-middle h-12 w-64 transform -skew-x-[35deg] transition-all duration-200 ${
        link == null
          ? 'bg-gray-700 cursor-not-allowed'
          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
      } ${className ?? ''}`}
    >
      <span className='transform skew-x-[35deg]'>{children}</span>
    </div>
  );

  if (link == null) {
    return mainComponent;
  }

  if (isInternal) {
    return <Link to={link}>{mainComponent}</Link>;
  }

  return (
    <OutboundLink href={link} target='_blank'>
      {mainComponent}
    </OutboundLink>
  );
};
export default Button;
