import { StaticImage } from 'gatsby-plugin-image';
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

const gameIntroductionItems = [
  {
    title: '塔を占拠した数で競うチーム制バトル',
    imageId: 'battle',
    content: (
      <>
        光チームと影チームの最大4vs4で戦い
        <br />
        制限時間終了時により多くの塔を
        <br />
        占拠していたチームの勝ちです。
      </>
    ),
  },
  {
    title: 'パワーアップアイテムを集めて強化',
    imageId: 'powerup',
    content: (
      <>
        ステージに散らばる
        <br />
        パワーアップアイテムを取ることで
        <br />
        速さや攻撃力などプレイヤーを強化できます。
      </>
    ),
  },
  {
    title: '多種多様な武器',
    imageId: 'weapon',
    content: (
      <>
        ステージには様々な武器が落ちています。
        <br />
        お気に入りの武器を見つけて
        <br />
        塔を壊し占拠したり敵を妨害したりできます。
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
    <StaticImage
      src='../images/header.jpg'
      alt='Header'
      width={1920}
      className='flex-none w-full'
    />
    <Section>
      <p className='text-4xl'>
        <span className='text-amber-200 font-bold'>光</span>と
        <span className='text-indigo-500 font-bold'>影</span>
        に分かれて戦う
        <br />
        オンライン対戦型3Dシューティング
      </p>

      <Section className='gap-2'>
        <p className='text-xl'>ウィッシュリストにぜひ登録してください！</p>
        <iframe
          src='https://store.steampowered.com/widget/1822700/?utm_source=koueinotou_hopmepage&utm_medium=referral&utm_campaign=permanent'
          frameBorder='0'
          width='646'
          height='190'
          title='Steam Store Widget'
        />
      </Section>

      <YouTube
        embedId='dfol9DmL2xU?si=_arHjj5gLkTcs1wD'
        aspectRatio={16.0 / 9.0}
        className='flex flex-grow mt-4 w-full'
      />
    </Section>

    <Section>
      <div className='flex justify-center items-center w-full gap-6 flex-col lg:flex-row'>
        <div>
          <p className='text-xl'>鋭意開発中</p>
          <Button link='/development-status' className='flex-none'>
            開発状況
          </Button>
        </div>
        <div>
          <p className='text-xl'>最新情報はこちら</p>
          <Button link='https://twitter.com/luftelli' className='flex-none'>
            Twitter
          </Button>
        </div>
      </div>
    </Section>

    <Section className='gap-y-6'>
      {gameIntroductionItems.map((g) => (
        <div
          key={g.title}
          className='flex w-full gap-x-4 flex-col items-center lg:odd:flex-row-reverse lg:even:flex-row'
        >
          {gameIntroductionImage(g.imageId, 'max-w-md lg:basis-1/2')}
          <div className='flex flex-col p-4 gap-y-2 lg:basis-1/2 '>
            <p className='text-2xl'>{g.title}</p>
            <div className='flex-grow' />
            <p className='text-base leading-relaxed'>{g.content}</p>
            <div className='flex-grow' />
          </div>
        </div>
      ))}
    </Section>

    <Section className='gap-y-6'>
      <div className='flex justify-center items-center w-full gap-6 flex-col lg:flex-row'>
        <Button className='flex-none h-20'>ゲームシステム詳細（準備中）</Button>
      </div>
      <div className='flex justify-center items-center w-full gap-6 flex-col lg:flex-row'>
        <Button link='https://forms.gle/FUJs7ia2cUuH3maZ6' className='flex-none'>
          お問い合わせ
        </Button>
        {/* <Button className='flex-none'>利用規約</Button>
          <Button className='flex-none'>ガイドライン</Button> */}
      </div>
    </Section>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>ギャラリー</h2>
      <div className='grid w-full gap-12 grid-cols-1 lg:grid-cols-2'>
        <StaticImage
          src='../images/ss1.jpg'
          alt='Screen Shot 1'
          width={640}
          className='justify-self-center max-w-md'
        />
        <StaticImage
          src='../images/ss5.jpg'
          alt='Screen Shot 5'
          width={640}
          className='justify-self-center max-w-md'
        />
        <StaticImage
          src='../images/ss2.jpg'
          alt='Screen Shot 2'
          width={640}
          className='justify-self-center max-w-md'
        />
        <StaticImage
          src='../images/ss4.jpg'
          alt='Screen Shot 4'
          width={640}
          className='justify-self-center max-w-md'
        />
        <StaticImage
          src='../images/ss3.jpg'
          alt='Screen Shot 3'
          width={640}
          className='justify-self-center max-w-md'
        />
        <StaticImage
          src='../images/ss6.jpg'
          alt='Screen Shot 6'
          width={640}
          className='justify-self-center max-w-md'
        />
      </div>
    </Section>

    <Section>
      <div className='grid w-full gap-12 grid-cols-1 lg:grid-cols-2'>
        <div className='h-full flex flex-col gap-4'>
          <h2 className='text-3xl'>ニュース</h2>
          <Box className='h-full'>
            <TwoDevidedList
              items={[
                ['2024/11/3', '：デジゲー博2024出展'],
                ['2023/11/12', '：デジゲー博2023出展'],
                ['2022/11/13', '：デジゲー博2022出展'],
                ['2022/6/26', '：IGC2022出展'],
                ['2022/1/12', '：Steamストアページ開設'],
                ['2022/1/10', '：公式サイトオープン'],
                ['2021/11/13', '：デジゲー博2021出展'],
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
                ['発売日', '：2025年度予定'],
                ['対応プレイ人数', '：1-8人'],
                ['対応プラットフォーム', '：Windows、MacOS X'],
                ['対応言語', '：日本語、英語（予定）'],
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
      <div className='grid w-full gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
