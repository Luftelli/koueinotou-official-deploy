import { Link } from 'gatsby';
import React from 'react';

type ButtonProps = {
  link?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, link, className }) => {
  // https://やhttp://を含まないなら内部コンテンツとする
  const isInternal = link == null ? false : !link.includes('://');

  const mainComponent = (
    <div
      className={`flex justify-center items-center text-2xl text-white font-bold align-middle h-12 w-64 rounded-lg ${
        link == null ? 'bg-gray-500' : ' bg-teal-400 hover:bg-teal-500'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  );

  return link == null ? (
    mainComponent
  ) : isInternal ? (
    <Link to={link}>{mainComponent}</Link>
  ) : (
    <a href={link} target='_blank'>
      {mainComponent}
    </a>
  );
};
export default Button;
