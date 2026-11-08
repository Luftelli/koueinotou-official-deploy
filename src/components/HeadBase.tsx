import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import OgpImage from '../images/ogp_image.jpg';

interface HeaderProps {
  // ページのパス（各ページのHeadに渡されるlocation.pathname）。og:urlと正規URLに使う
  // 指定しない場合はサイトのURLをog:urlとし、正規URLは出力しない
  pagePath?: string;
  pageTitle?: string;
  pageDescription?: string;
}

const HeadBase: React.FC<HeaderProps> = ({ pagePath, pageTitle, pageDescription }) => {
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
    pageDescription ?? 'オンライン対戦型3Dシューティングゲーム「光影の塔」公式サイト';
  const siteUrl = data?.site?.siteMetadata?.siteUrl ?? '';
  // 末尾のスラッシュの有無で別のURLと扱われないよう、Gatsbyの出力と同じスラッシュ付きに揃える
  const normalizedPath =
    pagePath == null ? undefined : pagePath.endsWith('/') ? pagePath : `${pagePath}/`;
  const pageUrl = normalizedPath == null ? siteUrl : `${siteUrl}${normalizedPath}`;

  return (
    <>
      <meta charSet='utf-8' />
      <meta name='theme-color' content='#000000' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@400;500;700&display=swap'
      />
      <html lang='ja' />
      <title>{title}</title>
      <meta name='description' content={description} />
      {normalizedPath != null && <link rel='canonical' href={pageUrl} />}
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={pageTitle ?? 'トップページ'} />
      <meta property='og:type' content={isTopPage ? 'website' : 'article'} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:image' content={`${siteUrl}${OgpImage}`} />
      <meta property='og:description' content={description} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:site' content='@luftelli' />
    </>
  );
};
export default HeadBase;
