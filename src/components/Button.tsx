import { Link } from 'gatsby';
import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import ExternalLinkIcon from './ExternalLinkIcon';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  link?: string;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

// 視覚的な優先度。primaryはゲームの選択中の項目と同じ明るい面にする
const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'menu-button-normal text-xl sm:text-2xl',
  secondary: 'menu-button-normal text-lg sm:text-xl',
};

const Button: React.FC<ButtonProps> = ({ children, link, variant = 'primary', className }) => {
  // https://やhttp://を含まないなら内部コンテンツとする
  const isInternal = link == null ? false : !link.includes('://');
  const isExternal = link != null && !isInternal;

  const mainComponent = (
    <div
      aria-disabled={link == null ? true : undefined}
      className={`menu-button h-14 w-64 ${
        link == null ? 'menu-button-disabled text-xl sm:text-2xl' : variantClassNames[variant]
      } ${className ?? ''}`}
    >
      <span className='menu-button-label'>
        {children}
        {isExternal && (
          <>
            <ExternalLinkIcon />
            <span className='sr-only'>（新しいタブで開く）</span>
          </>
        )}
      </span>
      <span aria-hidden='true' className='light-bar' />
    </div>
  );

  if (link == null) {
    return mainComponent;
  }

  if (isInternal) {
    return (
      <Link to={link} className='block w-full max-w-full lg:w-auto'>
        {mainComponent}
      </Link>
    );
  }

  return (
    <OutboundLink href={link} target='_blank' className='block w-full max-w-full lg:w-auto'>
      {mainComponent}
    </OutboundLink>
  );
};
export default Button;
