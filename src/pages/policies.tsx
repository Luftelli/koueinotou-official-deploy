import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';
import Box from '../components/Box';
import HeadBase from '../components/HeadBase';
import Layout from '../components/Layout';
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
        <p className='text-sm font-bold tracking-[0.3em] text-cyan-300'>POLICIES</p>
        <h1 className='mt-3 text-3xl font-bold text-white sm:text-4xl'>規約・ポリシー</h1>
        <p className='mt-6 text-base leading-8 text-slate-300 sm:text-lg'>
          「光影の塔」公式サイトおよび本作の利用・配信などには、ゲーム制作サークルLuftelliが定める共通規約・方針が適用されます。最新の内容は、以下のLuftelli公式ページをご確認ください。
        </p>
      </div>

      <Box className='max-w-4xl'>
        <ul className='divide-y divide-cyan-200/10 text-left'>
          {policies.map(({ title, description, href }) => (
            <li key={href}>
              <OutboundLink
                href={href}
                target='_blank'
                className='group/link flex flex-col gap-2 px-1 py-5 transition-colors duration-200 sm:px-2 sm:py-6'
              >
                <span className='flex items-center justify-between gap-4 text-lg font-bold text-white transition-colors duration-200 group-hover/link:text-cyan-200 sm:text-xl'>
                  {title}
                  <span aria-hidden='true' className='text-cyan-300'>
                    ↗
                  </span>
                </span>
                <span className='text-sm leading-6 text-slate-400 sm:text-base'>{description}</span>
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
