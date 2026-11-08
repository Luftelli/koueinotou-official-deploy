import { StaticImage } from 'gatsby-plugin-image';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { HeadProps } from 'gatsby';
import React from 'react';
import Box from '../components/Box';
import Button from '../components/Button';
import DeveloperCard from '../components/DeveloperCard';
import HeadBase from '../components/HeadBase';
import Layout from '../components/Layout';
import LoopVideo from '../components/LoopVideo';
import MenuHeading from '../components/MenuHeading';
import Section from '../components/Section';
import TwoDevidedList from '../components/TwoDevidedList';
import World from '../components/World';

import CdecIcon from '../images/cdec_icon_v2.1.png';
import ZipIcon from '../images/zip_icon.jpg';
import HighlightVideo from '../images/game-details/highlight.mp4';
import HighlightPoster from '../images/game-details/highlight_poster.jpg';
import SteamGame from '../components/SteamGame';

const steamStoreUrl =
  'https://store.steampowered.com/app/1822700/?utm_source=koueinotou_hopmepage&utm_medium=referral&utm_campaign=permanent';

const gameIntroductionItems = [
  {
    title: '爽快感抜群のチーム対戦型STG',
    imageId: 'battle',
    detailsAnchor: 'rules',
    tone: 'light',
    content:
      '光と影チームに分かれ、個性的なエリアからなるステージを探索し塔を占拠🗼オブジェクトを壊しながら自機を強化し、塔の占拠数で競うオンライン対応バトル！',
  },
  {
    title: '探索と破壊',
    imageId: 'weapon',
    detailsAnchor: 'overview',
    tone: 'shadow',
    content:
      'ステージには塔や壊せるオブジェクトが点在。塔を占拠し、オブジェクトを壊しまくりながらステージを探索！敵プレイヤーに出くわしたらついでに攻撃しちゃえ😎',
  },
  {
    title: 'マシン強化',
    imageId: 'powerup',
    detailsAnchor: 'power-up',
    tone: 'light',
    content:
      '落ちているパワーアップアイテムでマシンを強化可能。特定のアイテムを集めるもよし、満遍なく集めるもよし。「自分だけのマシン」を育て上げよう✨',
  },
] as const;

function gameIntroductionImage(id: string, className: string) {
  switch (id) {
    case 'battle':
      return (
        <StaticImage
          src='../images/intro_battle.jpg'
          alt='敵味方のプレイヤーが入り乱れて塔を奪い合う対戦画面'
          width={640}
          className={className}
        />
      );
    case 'powerup':
      return (
        <StaticImage
          src='../images/intro_powerup.jpg'
          alt='パワーアップアイテムを取って武器性能が上がる瞬間のマシン'
          width={640}
          className={className}
        />
      );
    case 'weapon':
      return (
        <StaticImage
          src='../images/intro_weapon.jpg'
          alt='ブロック状に崩れ落ちる建物の中を進むマシン'
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
    <div className='relative w-full'>
      <div className='hero-frame w-full'>
        <div className='hero-image'>
          <StaticImage
            src='../images/header.jpg'
            alt='光影の塔のキービジュアル'
            width={1920}
            loading='eager'
            // 横幅に比例させ、どの画面幅でもロゴと読み仮名まで同じ構図で見せる
            className='block w-full lg:h-[max(27rem,34vw)]'
            imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
      </div>

      {/* 文字はキービジュアルに重ねず、境界線の下の暗い背景に置く */}
      <div className='hero-plate mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 pt-8 text-left sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 xl:px-16 2xl:px-20'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-[clamp(1.5rem,2.4vw,2.25rem)] font-bold leading-snug'>
            <span className='team-mark bg-hikari'>光</span>と
            <span className='team-mark bg-kage'>影</span>に分かれて戦う
            <br />
            オンライン対戦型3Dシューティング
          </h1>
          <p className='max-w-[34rem] text-sm leading-6 text-ink-dim lg:text-base lg:leading-7'>
            2027年2月発売予定。Steamでウィッシュリストに登録して、最新情報をお待ちください。
          </p>
        </div>
        {/*
          文字と横に並ぶ幅では、ゲームのタイトル画面のメニューと同じく縦に並べる
          それより狭い幅では、公式Xと開発状況のボタンと同じく横並び、さらに狭ければ幅いっぱいで縦に積む
        */}
        <div className='grid w-full flex-none grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:w-auto lg:flex-col'>
          <Button link={steamStoreUrl} className='!w-full !text-lg lg:!w-72'>
            ウィッシュリストに登録
          </Button>
          <Button link='/game-details' variant='secondary' className='!w-full !text-lg lg:!w-72'>
            どんなゲーム？
          </Button>
        </div>
      </div>
    </div>

    <div className='h-10 lg:h-6' />

    <World tone='light'>
      <Section className='gap-8 !py-8 text-left lg:grid lg:grid-cols-12 lg:items-center lg:!py-10'>
        <div className='flex w-full flex-col gap-4 lg:col-span-7'>
          <MenuHeading>
            <span className='inline-block'>デジゲー博2026に</span>
            <span className='inline-block'>出展します！</span>
          </MenuHeading>
          <p className='max-w-[38rem] text-base leading-8 text-ink-dim sm:text-lg'>
            「光影の塔」完成版を出展・頒布予定。体験プレイも可能なのでぜひお越しください！
          </p>
          <OutboundLink
            href='https://digigame-expo.org/'
            target='_blank'
            rel='noreferrer'
            className='block w-full max-w-[468px] transition-opacity hover:opacity-80'
          >
            <img
              src='https://digigame-expo.org/wp-content/uploads/2014/06/digihaku-banner1.png'
              alt='デジゲー博2026に出展します。公式サイトへ'
              width={468}
              height={60}
              loading='lazy'
              className='h-auto w-full'
            />
          </OutboundLink>
        </div>
        <dl className='w-full divide-y divide-rule border-y border-rule text-base leading-7 sm:text-lg lg:col-span-5'>
          <div className='grid grid-cols-[4.5rem_1fr] gap-4 py-3'>
            <dt className='font-bold'>日時</dt>
            <dd className='min-w-0'>
              <time className='inline-block' dateTime='2026-11-08'>
                11月8日（日）
              </time>{' '}
              <span className='inline-block'>11:00～16:00</span>
            </dd>
          </div>
          <div className='grid grid-cols-[4.5rem_1fr] gap-4 py-3'>
            <dt className='font-bold'>会場</dt>
            <dd className='min-w-0'>
              <span className='inline-block'>秋葉原UDX2階</span>{' '}
              <span className='inline-block'>アキバ・スクエア</span>
            </dd>
          </div>
          <div className='grid grid-cols-[4.5rem_1fr] gap-4 py-3'>
            <dt className='font-bold'>ブース</dt>
            <dd className='min-w-0 text-2xl font-bold'>A-14ab</dd>
          </div>
        </dl>
      </Section>
    </World>

    <Section className='gap-8 text-left'>
      <LoopVideo
        src={HighlightVideo}
        poster={HighlightPoster}
        label='走る、塔を壊す、アイテムを取る、空を飛ぶ、オーバードライブ、勝利までを短くまとめたプレイ映像'
        className='w-full border border-rule bg-black'
      />
      <div className='flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between'>
        <SteamGame
          gameId='1822700'
          additionalQuery='?utm_source=koueinotou_hopmepage&utm_medium=referral&utm_campaign=permanent'
        />
        <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto'>
          <div>
            <p className='mb-2 text-center text-sm lg:text-left'>最新情報はこちら</p>
            <Button link='https://x.com/luftelli' variant='secondary' className='w-full'>
              公式X
            </Button>
          </div>
          <div>
            <p className='mb-2 text-center text-sm lg:text-left'>鋭意開発中</p>
            <Button link='/development-status' variant='secondary' className='w-full'>
              開発状況
            </Button>
          </div>
        </div>
      </div>
    </Section>

    {gameIntroductionItems.map((g, index) => (
      <World key={g.title} tone={g.tone}>
        <Section className='!py-8 lg:!py-10'>
          <div className='grid w-full items-center gap-6 text-left lg:grid-cols-12 lg:gap-12'>
            <div className={`w-full lg:col-span-7 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
              {gameIntroductionImage(g.imageId, 'slant-frame w-full')}
            </div>
            <div className='flex flex-col items-start gap-y-5 lg:col-span-5'>
              <MenuHeading>{g.title}</MenuHeading>
              <p className='info-back max-w-[36rem] text-base leading-8 text-ink-dim sm:text-lg'>
                {g.content}
              </p>
              <Button link={`/game-details/#${g.detailsAnchor}`} variant='secondary'>
                詳しく見る
              </Button>
            </div>
          </div>
        </Section>
      </World>
    ))}

    <Section className='gap-y-8'>
      <MenuHeading>ギャラリー</MenuHeading>
      <div className='grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        <StaticImage
          src='../images/stage_kishou.jpg'
          alt='癸晶の城跡の水辺から城跡と上空の円環を見上げた風景'
          width={1000}
          className='h-full w-full md:col-span-2 lg:row-span-2'
        />
        <StaticImage
          src='../images/ss5.jpg'
          alt='月と光る環状の道を見下ろして飛ぶマシン'
          width={640}
          className='w-full'
        />
        <StaticImage
          src='../images/ss2.jpg'
          alt='昼のエリアを走り、遠くの塔を狙うマシン'
          width={640}
          className='w-full'
        />
        <StaticImage
          src='../images/ss3.jpg'
          alt='オーバードライブ中に建物を破壊するマシン'
          width={640}
          className='w-full'
        />
        <StaticImage
          src='../images/ss7.jpg'
          alt='残り60秒を知らせる赤いエリアを走るマシン'
          width={640}
          className='w-full'
        />
        <StaticImage
          src='../images/ss6.jpg'
          alt='光チームが51対13で勝利した結果画面'
          width={640}
          className='w-full md:col-span-2 lg:col-span-1'
        />
      </div>
    </Section>

    <Section>
      <div className='grid w-full grid-cols-1 gap-x-6 gap-y-12 text-left lg:grid-cols-2'>
        <div className='flex flex-col gap-6'>
          <MenuHeading>スペック</MenuHeading>
          <Box className='flex-1'>
            <TwoDevidedList
              items={[
                ['ゲームタイトル', '光影の塔'],
                ['価格', '未定'],
                ['発売日', '2027年2月予定'],
                ['対応プレイ人数', '1-8人'],
                ['対応プラットフォーム', 'Windows'],
                ['対応言語', '日本語（英語版は検討中・公開日未定）'],
                ['対応年齢', '全年齢'],
                ['ネットワーク機能', 'あり'],
                ['開発チーム名', 'Luftelli'],
              ]}
            />
          </Box>
        </div>
        <div className='flex flex-col gap-6'>
          <MenuHeading>ニュース</MenuHeading>
          <Box className='flex-1'>
            <TwoDevidedList
              items={[
                ['2026年11月8日', 'デジゲー博2026出展予定'],
                ['2025年11月9日', 'デジゲー博2025出展'],
                ['2024年11月3日', 'デジゲー博2024出展'],
                ['2023年11月12日', 'デジゲー博2023出展'],
                ['2022年11月13日', 'デジゲー博2022出展'],
                ['2022年6月26日', 'IGC2022出展'],
                ['2022年1月12日', 'Steamストアページ開設'],
                ['2022年1月10日', '公式サイトオープン'],
                ['2021年11月13日', 'デジゲー博2021出展'],
              ]}
            />
          </Box>
        </div>
      </div>
    </Section>

    <World tone='light'>
      <Section className='gap-y-6 !py-8 lg:!py-10'>
        <MenuHeading>開発者</MenuHeading>
        <div className='grid w-full grid-cols-1 gap-x-10 lg:grid-cols-2'>
          <DeveloperCard icon={CdecIcon} name='Cdec' xAccount='cdecpgl' charge='全般担当' />
          <DeveloperCard name='Lui' charge='企画・デザインサポート' />
          <DeveloperCard name='Van' charge='デバッグ担当' />
          <DeveloperCard icon={ZipIcon} name='Zip' charge='開発サポート（2018/7～）' />
          <DeveloperCard name='S丼' charge='発案・初期開発（～2018/3）' />
        </div>
      </Section>
    </World>
  </Layout>
);

export default IndexPage;

export const Head = ({ location }: HeadProps) => <HeadBase pagePath={location.pathname} />;
