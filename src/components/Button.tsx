import { Link } from 'gatsby';
import React from 'react';

type ButtonProps = {
  link?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, link, className }) => {
  return link == null ? (
    <div
      className={`flex justify-center items-center h-12 w-64 bg-teal-400 hover:bg-teal-500 rounded-lg ${
        className ?? ''
      }`}
    >
      <p className='text-2xl text-white font-bold h-fit align-middle'>{children}</p>
    </div>
  ) : (
    <Link to={link}>{children}</Link>
  );
};
export default Button;
