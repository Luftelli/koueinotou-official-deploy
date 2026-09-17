import { StaticImage } from 'gatsby-plugin-image';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';
import Box from '../components/Box';
import Button from '../components/Button';
import DeveloperCard from '../components/DeveloperCard';
import HeadBase from '../components/HeadBase';
import Layout from '../components/Layout';
import Section from '../components/Section';
import TwoDevidedList from '../components/TwoDevidedList';

import CdecIcon from '../images/cdec_icon_v2.1.png';
import ZipIcon from '../images/zip_icon.jpg';
import YouTube from '../components/YouTube';
import SteamGame from '../components/SteamGame';

const gameIntroductionItems = [
  {
    title: '爽快感抜群のチーム対戦型STG',
    imageId: 'battle',
    content: (
      <>
        光と影チームに分かれ
        <br />
        個性的なエリアからなるステージを探索し塔を占拠🗼
        <br />
        オブジェクトを壊しながら自機を強化し
        <br />
        塔の占拠数で競うオンライン対応バトル！
      </>
    ),
  },
  {
    title: '探索と破壊',
    imageId: 'weapon',
    content: (
      <>
        ステージには塔や壊せるオブジェクトが点在。
        <br />
        塔を占拠し、オブジェクトを壊しまくりながら
        <br />
        ステージを探索！
        <br />
        敵プレイヤーに出くわしたらついでに攻撃しちゃえ😎
      </>
    ),
  },
  {
    title: 'マシン強化',
    imageId: 'powerup',
    content: (
      <>
        落ちているパワーアップアイテムで
        <br />
        マシンを強化可能。
        <br />
        特定のアイテムを集めるもよし
        <br />
        満遍なく集めるもよし
        <br />
        「自分だけのマシン」を育て上よう✨
      </>
    ),
  },
] as const;

function gameIntroductionImage(id: string, className: string) {
  switch (id) {
    case 'battle':
      return (
        <StaticImage
          src='../images/intro_winner.jpg'
          alt={`Screen Shot ${id}`}
          width={640}
          className={className}
        />
      );
    case 'powerup':
      return (
        <StaticImage
          src='../images/intro_powerup.jpg'
          alt={`Screen Shot ${id}`}
          width={640}
          className={className}
        />
      );
    case 'weapon':
      return (
        <StaticImage
          src='../images/intro_weapon.jpg'
          alt={`Screen Shot ${id}`}
          width={640}
          className={className}
        />
      );
    default:
      return undefined;
  }
}

const IndexPage = () => (
  <Layout>
    <div className='relative w-full overflow-hidden border-b border-cyan-300/10'>
      <StaticImage
        src='../images/header.jpg'
        alt='光影の塔のキービジュアル'
        width={1920}
        className='flex-none w-full lg:h-[clamp(34rem,56vw,52rem)]'
        imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
      />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent' />
    </div>

    <Section className='gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:text-left'>
      <div className='flex w-full flex-col items-center gap-6 lg:col-span-5 lg:items-start'>
        <h1 className='text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[1.15] tracking-tight'>
          <span className='text-amber-200'>光</span>と<span className='text-indigo-400'>影</span>
          に分かれて戦う
          <br />
          オンライン対戦型
          <br className='hidden xl:block' />
          3Dシューティング
        </h1>
        <p className='max-w-2xl text-base leading-8 text-slate-300 sm:text-lg'>
          2026年公開予定。Steamでウィッシュリストに登録して、最新情報をお待ちください。
        </p>
        <div className='w-full max-w-xl'>
          <SteamGame
            gameId='1822700'
            additionalQuery='?utm_source=koueinotou_hopmepage&utm_medium=referral&utm_campaign=permanent'
          />
        </div>
        <div className='grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <p className='mb-2 text-sm text-slate-400'>鋭意開発中</p>
            <Button link='/development-status'>開発状況</Button>
          </div>
          <div>
            <p className='mb-2 text-sm text-slate-400'>最新情報はこちら</p>
            <Button link='https://twitter.com/luftelli'>Twitter</Button>
          </div>
        </div>
      </div>

      <div className='w-full lg:col-span-7'>
        <YouTube
          embedId='xlILRvLVTP8?si=u1KGNydJKVd9dQwz'
          aspectRatio={16.0 / 9.0}
          className='flex w-full flex-grow overflow-hidden border border-white/10 bg-black shadow-2xl shadow-cyan-900/40'
        />
      </div>
    </Section>

    <Section className='gap-5'>
      <h2 className='text-center text-2xl leading-relaxed sm:text-3xl'>
        <span className='inline-block'>デジゲー博2026に</span>
        <span className='inline-block'>出展します！</span>
      </h2>
      <Box className='max-w-5xl'>
        <div className='flex flex-col items-center gap-5'>
          <OutboundLink
            href='https://digigame-expo.org/'
            target='_blank'
            rel='noreferrer'
            className='mx-auto block w-full max-w-[468px] transition-opacity hover:opacity-80'
          >
            <img
              src='https://digigame-expo.org/wp-content/uploads/2014/06/digihaku-banner1.png'
              alt='デジゲー博2026に出展します。公式サイトへ'
              width={468}
              height={60}
              className='h-auto w-full'
            />
          </OutboundLink>
          <p className='text-center text-base text-slate-300 sm:text-lg'>
            「光影の塔」完成版を出展・頒布予定。体験プレイも可能なのでぜひお越しください！
          </p>
          <div className='max-w-3xl py-2'>
            <dl className='space-y-5 text-left text-base leading-7 sm:text-lg'>
              <div className='flex flex-col gap-1 lg:flex-row lg:gap-6'>
                <dt className='shrink-0 font-bold text-cyan-200 lg:w-20'>日時</dt>
                <dd className='min-w-0'>
                  <time className='inline-block' dateTime='2026-11-08'>
                    11月8日（日）
                  </time>{' '}
                  <span className='inline-block'>11:00～16:00</span>
                </dd>
              </div>
              <div className='flex flex-col gap-1 lg:flex-row lg:gap-6'>
                <dt className='shrink-0 font-bold text-cyan-200 lg:w-20'>会場</dt>
                <dd className='min-w-0'>
                  <span className='inline-block'>秋葉原UDX2階</span>{' '}
                  <span className='inline-block'>アキバ・スクエア</span>
                </dd>
              </div>
              <div className='flex flex-col gap-1 lg:flex-row lg:gap-6'>
                <dt className='shrink-0 font-bold text-cyan-200 lg:w-20'>ブース</dt>
                <dd className='min-w-0'>A-14ab</dd>
              </div>
            </dl>
          </div>
        </div>
      </Box>
    </Section>

    <Section className='gap-y-12 lg:gap-y-20'>
      {gameIntroductionItems.map((g, index) => (
        <div
          key={g.title}
          className='grid w-full items-center gap-6 text-center lg:grid-cols-12 lg:gap-10 lg:text-left'
        >
          <div className={`w-full lg:col-span-7 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
            {gameIntroductionImage(
              g.imageId,
              'w-full overflow-hidden border border-white/10 shadow-2xl shadow-black/30',
            )}
          </div>
          <div className='flex flex-col items-center gap-y-4 lg:col-span-5 lg:items-start lg:p-6'>
            <h2 className='text-3xl font-bold sm:text-4xl'>{g.title}</h2>
            <p className='text-base leading-8 text-slate-300 sm:text-lg'>{g.content}</p>
          </div>
        </div>
      ))}
    </Section>

    <Section className='gap-y-6'>
      <div className='flex w-full flex-col items-center justify-center gap-6 sm:flex-row'>
        <Button link='https://luftelli.com/contact' className='flex-none h-20'>
          お問い合わせ
        </Button>
        {/* <Button className='flex-none'>利用規約</Button>
          <Button className='flex-none'>ガイドライン</Button> */}
      </div>
    </Section>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>ギャラリー</h2>
      <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        <StaticImage
          src='../images/ss1.jpg'
          alt='Screen Shot 1'
          width={640}
          className='w-full overflow-hidden border border-white/10 shadow-xl'
        />
        <StaticImage
          src='../images/ss5.jpg'
          alt='Screen Shot 5'
          width={640}
          className='w-full overflow-hidden border border-white/10 shadow-xl'
        />
        <StaticImage
          src='../images/ss2.jpg'
          alt='Screen Shot 2'
          width={640}
          className='w-full overflow-hidden border border-white/10 shadow-xl'
        />
        <StaticImage
          src='../images/ss4.jpg'
          alt='Screen Shot 4'
          width={640}
          className='w-full overflow-hidden border border-white/10 shadow-xl'
        />
        <StaticImage
          src='../images/ss3.jpg'
          alt='Screen Shot 3'
          width={640}
          className='w-full overflow-hidden border border-white/10 shadow-xl'
        />
        <StaticImage
          src='../images/ss6.jpg'
          alt='Screen Shot 6'
          width={640}
          className='w-full overflow-hidden border border-white/10 shadow-xl'
        />
      </div>
    </Section>

    <Section>
      <div className='grid w-full grid-cols-1 gap-8 lg:grid-cols-2'>
        <div className='h-full flex flex-col gap-4'>
          <h2 className='text-3xl'>ニュース</h2>
          <Box className='h-full'>
            <TwoDevidedList
              items={[
                ['2026年11月8日', '：デジゲー博2026出展予定'],
                ['2025年11月9日', '：デジゲー博2025出展'],
                ['2024年11月3日', '：デジゲー博2024出展'],
                ['2023年11月12日', '：デジゲー博2023出展'],
                ['2022年11月13日', '：デジゲー博2022出展'],
                ['2022年6月26日', '：IGC2022出展'],
                ['2022年1月12日', '：Steamストアページ開設'],
                ['2022年1月10日', '：公式サイトオープン'],
                ['2021年11月13日', '：デジゲー博2021出展'],
              ]}
              className='text-base text-left'
            />
          </Box>
        </div>
        <div className='h-full flex flex-col gap-4'>
          <h2 className='text-3xl'>スペック</h2>
          <Box className='h-full'>
            <TwoDevidedList
              items={[
                ['ゲームタイトル', '：光影の塔'],
                ['価格', '：未定'],
                ['発売日', '：2026年予定'],
                ['対応プレイ人数', '：1-8人'],
                ['対応プラットフォーム', '：Windows'],
                ['対応言語', '：日本語'],
                ['対応年齢', '：全年齢'],
                ['ネットワーク機能', '：あり'],
                ['開発チーム名', '：Luftelli'],
              ]}
              className='text-base text-left'
            />
          </Box>
        </div>
      </div>
    </Section>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>開発者</h2>
      <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5'>
        <DeveloperCard icon={CdecIcon} name='Cdec' twitter='cdecpgl' charge='全般担当' />
        <DeveloperCard name='Lui' charge='企画・デザインサポート' />
        <DeveloperCard name='Van' charge='デバッグ担当' />
        <DeveloperCard icon={ZipIcon} name='Zip' charge='開発サポート（2018/7～）' />
        <DeveloperCard name='S丼' charge='発案・初期開発（～2018/3）' />
      </div>
    </Section>
  </Layout>
);

export default IndexPage;

export const Head = () => <HeadBase />;
