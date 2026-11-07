import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';
import Box from '../components/Box';
import ExternalLinkIcon from '../components/ExternalLinkIcon';
import HeadBase from '../components/HeadBase';
import Layout from '../components/Layout';
import MenuHeading from '../components/MenuHeading';
import Section from '../components/Section';

const policies = [
  {
    title: '利用規約',
    description: 'Luftelliのサービスやコンテンツをご利用いただく際の共通ルールです。',
    href: 'https://luftelli.com/terms.html',
  },
  {
    title: 'プライバシーポリシー',
    description: '個人情報やアクセス情報の取り扱いについて定めています。',
    href: 'https://luftelli.com/privacy.html',
  },
  {
    title: '配信・二次創作ガイドライン',
    description: 'ゲーム配信、動画投稿、二次創作などに関するガイドラインです。',
    href: 'https://luftelli.com/content-guidelines.html',
  },
  {
    title: '生成AI利用方針',
    description: 'Luftelliにおける生成AIの利用と、関連コンテンツの取り扱い方針です。',
    href: 'https://luftelli.com/ai-policy.html',
  },
] as const;

const PoliciesPage = () => (
  <Layout>
    <Section className='gap-y-8'>
      <div className='w-full max-w-4xl text-left'>
        <MenuHeading as='h1'>規約・ポリシー</MenuHeading>
        <p className='info-back mt-6 text-base leading-8 text-ink-dim sm:text-lg'>
          「光影の塔」公式サイトおよび本作の利用・配信などには、ゲーム制作サークルLuftelliが定める共通規約・方針が適用されます。最新の内容は、以下のLuftelli公式ページをご確認ください。
        </p>
      </div>

      <Box className='max-w-4xl'>
        <ul className='divide-y divide-rule text-left'>
          {policies.map(({ title, description, href }) => (
            <li key={href}>
              <OutboundLink
                href={href}
                target='_blank'
                className='group/link flex flex-col gap-2 px-1 py-5 sm:px-2 sm:py-6'
              >
                <span className='flex items-center justify-between gap-4 text-lg font-bold decoration-2 underline-offset-[6px] group-hover/link:underline sm:text-xl'>
                  {title}
                  <ExternalLinkIcon />
                  <span className='sr-only'>（新しいタブで開く）</span>
                </span>
                <span className='text-sm leading-6 text-ink-dim sm:text-base'>{description}</span>
              </OutboundLink>
            </li>
          ))}
        </ul>
      </Box>
    </Section>
  </Layout>
);

export default PoliciesPage;

export const Head = () => (
  <HeadBase
    pageTitle='規約・ポリシー'
    pageDescription='「光影の塔」に適用されるLuftelli共通の規約・方針をご案内します。'
  />
);
