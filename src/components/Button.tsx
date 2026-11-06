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

// 視覚的な優先度。primaryが最も目立つ
const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'text-xl text-white sm:text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]',
  secondary:
    'text-lg text-cyan-100 sm:text-xl border-2 border-cyan-400 bg-slate-900/60 hover:bg-cyan-400/20',
};

const Button: React.FC<ButtonProps> = ({ children, link, variant = 'primary', className }) => {
  // https://やhttp://を含まないなら内部コンテンツとする
  const isInternal = link == null ? false : !link.includes('://');
  const isExternal = link != null && !isInternal;

  const mainComponent = (
    <div
      className={`mx-auto flex h-12 w-64 max-w-full transform items-center justify-center px-6 align-middle font-bold -skew-x-[24deg] transition-all duration-200 sm:mx-0 ${
        link == null
          ? 'text-xl text-white sm:text-2xl bg-gray-700 cursor-not-allowed'
          : variantClassNames[variant]
      } ${className ?? ''}`}
    >
      <span className='inline-flex transform items-center gap-2 skew-x-[24deg]'>
        {children}
        {isExternal && (
          <>
            <ExternalLinkIcon />
            <span className='sr-only'>（新しいタブで開く）</span>
          </>
        )}
      </span>
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
