import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

type HeaderProps = {
  pageTitle?: string;
  pageDescription?: string;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ pageTitle, pageDescription, className = '' }) => {
  const data = useStaticQuery<GatsbyTypes.HeaderQuery>(graphql`
    query Header {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const metaDataTitle = data?.site?.siteMetadata?.title ?? 'タイトル不明';
  const title = pageTitle == null ? metaDataTitle : `${metaDataTitle} ${pageTitle}`;
  const description = pageDescription == null ? '光影の塔公式ページ' : pageDescription;

  return (
    <header className={className}>
      <Helmet>
        <meta charSet='utf-8' />
        <html lang='ja' />
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>

      <nav className='flex justify-center w-full mb-9 py-4 border-b-2'></nav>
    </header>
  );
};
export default Header;
