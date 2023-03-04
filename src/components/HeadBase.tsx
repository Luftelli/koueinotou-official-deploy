import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import OgpImage from '../images/ogp_image.jpg';

type HeaderProps = {
  pageTitle?: string;
  pageDescription?: string;
};

const HeadBase: React.FC<HeaderProps> = ({ pageTitle, pageDescription }) => {
  const data = useStaticQuery<Queries.HeaderQuery>(graphql`
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
  const description =
    pageDescription == null
      ? 'オンライン対戦型3Dシューティングゲーム「光影の塔」公式サイト'
      : pageDescription;

  return (
    <>
      <meta charSet='utf-8' />
      <html lang='ja' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={pageTitle ?? 'トップページ'} />
      <meta property='og:type' content={isTopPage ? 'website' : 'article'} />
      <meta property='og:url' content={data?.site?.siteMetadata?.siteUrl ?? undefined} />
      <meta property='og:image' content={`${data?.site?.siteMetadata?.siteUrl}${OgpImage}`} />
      <meta property='og:description' content={description} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:site' content='@luftelli' />
    </>
  );
};
export default HeadBase;
