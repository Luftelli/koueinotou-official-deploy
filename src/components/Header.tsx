import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import OgpImage from '../images/ogp_image.jpg';

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
          siteUrl
        }
      }
    }
  `);

  // ページタイトルが指定されない場合はトップページとする
  const isTopPage = pageTitle == null;
  const siteName = data?.site?.siteMetadata?.title ?? 'タイトル不明';
  const title = pageTitle == null ? siteName : `${siteName} ${pageTitle}`;
  const description = pageDescription == null ? 'オンライン対戦型3Dシューティングゲーム「光影の塔」公式サイト' : pageDescription;

  return (
    <header className={className}>
      <Helmet>
        <meta charSet='utf-8' />
        <html lang='ja' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:site_name' content={siteName} />
        <meta property='og:title' content={pageTitle ?? 'トップページ'} />
        <meta property='og:type' content={isTopPage ? 'website' : 'article'} />
        <meta property='og:url' content={data?.site?.siteMetadata?.siteUrl} />
        <meta property='og:image' content={`${data?.site?.siteMetadata?.siteUrl}/${OgpImage}`} />
        <meta property='og:description' content={description} />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:site' content='@luftelli' />
      </Helmet>

      <nav className='flex justify-center w-full py-2'>
        <div className='flex flex-grow max-w-screen-lg px-4'>
          <a href='https://luftelli.com'>
            <p className='flex-none text-base'>Luftelli</p>
          </a>
        </div>
      </nav>
    </header>
  );
};
export default Header;
