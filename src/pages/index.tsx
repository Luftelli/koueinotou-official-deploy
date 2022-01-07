import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import Box from '../components/Box';
import Button from '../components/Button';
import DeveloperCard from '../components/DeveloperCard';
import Layout from '../components/Layout';
import Section from '../components/Section';
import TwoDevidedList from '../components/TwoDevidedList';

import CdecIcon from '../images/cdec_icon_v2.1.png';
import ZipIcon from '../images/zip_icon.jpg';

const gameIntroductionItems = [
  {
    title: '塔を占拠した数で競うチーム制バトル',
    imageId: 'buttle',
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
    case 'buttle':
      return (
        <StaticImage
          src='../images/intro_winner.jpg'
          alt={`Screen Shot ${id}`}
          className={className}
        />
      );
    case 'powerup':
      return (
        <StaticImage
          src='../images/intro_powerup.jpg'
          alt={`Screen Shot ${id}`}
          className={className}
        />
      );
    case 'weapon':
      return (
        <StaticImage
          src='../images/intro_weapon.jpg'
          alt={`Screen Shot ${id}`}
          className={className}
        />
      );
  }
}

const IndexPage = () => {
  return (
    <Layout>
      <StaticImage src='../images/header.jpg' alt='Header' className='flex-none w-full' />
      <Section>
        <p className='text-4xl'>
          <span className='text-amber-200 font-bold'>光</span>と
          <span className='text-indigo-500 font-bold'>影</span>
          に分かれて戦う
          <br />
          オンライン対戦型3Dシューティング
        </p>
      </Section>

      <Section>
        <div className='flex justify-center w-full gap-x-6'>
          <div>
            <p className='text-xl'>最新情報はこちら</p>
            <Button link='https://twitter.com/luftelli' className='flex-none'>
              Twitter
            </Button>
          </div>
          <div>
            <p className='text-xl'>ストアページ準備中</p>
            <Button className='flex-none'>Steam</Button>
          </div>
        </div>
      </Section>

      <Section>
        <p className='text-4xl'>鋭意開発中</p>
      </Section>

      <Section className='gap-y-6'>
        {gameIntroductionItems.map((g, i) => (
          <div className='flex w-full odd:flex-row-reverse even:flex-row gap-x-4'>
            {gameIntroductionImage(g.imageId, 'basis-1/2')}
            <div className='basis-1/2 flex flex-col p-4 gap-y-2'>
              <p className='text-2xl'>{g.title}</p>
              <div className='flex-grow'></div>
              <p className='text-base leading-relaxed'>{g.content}</p>
              <div className='flex-grow'></div>
            </div>
          </div>
        ))}
      </Section>

      <Section className='gap-y-6'>
        <div className='flex justify-center w-full gap-x-6'>
          <Button className='flex-none h-20'>ゲームシステム詳細（準備中）</Button>
        </div>
        <div className='flex justify-center w-full gap-x-6'>
          <Button link='/development-status' className='flex-none'>
            開発状況
          </Button>
          <Button link='https://forms.gle/FUJs7ia2cUuH3maZ6' className='flex-none'>
            お問い合わせ
          </Button>
          {/* <Button className='flex-none'>利用規約</Button>
          <Button className='flex-none'>ガイドライン</Button> */}
        </div>
      </Section>

      <Section className='gap-y-4'>
        <h2 className='text-3xl'>ギャラリー</h2>
        <div className='grid grid-cols-2 w-full gap-12'>
          <StaticImage src='../images/ss1.jpg' alt='Screen Shot 1' />
          <StaticImage src='../images/ss5.jpg' alt='Screen Shot 5' />
          <StaticImage src='../images/ss2.jpg' alt='Screen Shot 2' />
          <StaticImage src='../images/ss4.jpg' alt='Screen Shot 4' />
          <StaticImage src='../images/ss3.jpg' alt='Screen Shot 3' />
          <StaticImage src='../images/ss6.jpg' alt='Screen Shot 6' />
        </div>
      </Section>

      <Section>
        <div className='grid grid-cols-2 w-full gap-12'>
          <div className='h-full flex flex-col gap-4'>
            <h2 className='text-3xl'>ニュース</h2>
            <Box className='h-full'>
              <TwoDevidedList
                items={[
                  ['2022/1/10', '：公式サイトオープン'],
                  ['2021/11/14', '：デジゲー博2021出展'],
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
                  ['発売日', '：2022年後半予定'],
                  ['対応プレイ人数', '：1-8人'],
                  ['対応プラットフォーム', '：Windows、MacOS X（予定）'],
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
        <div className='grid grid-cols-3 w-full gap-12'>
          <DeveloperCard icon={CdecIcon} name='Cdec' twitter='cdecpgl' charge='全般担当' />
          <DeveloperCard name='Lui' charge='開発補助' />
          <DeveloperCard name='Van' charge='デバッグ担当' />
          <DeveloperCard
            icon={ZipIcon}
            name='Zip'
            twitter='ziiiii_iiiiip'
            charge='開発補助（2018/7～）'
          />
          <DeveloperCard name='S丼' twitter='S_don_Luftelli' charge='プログラム補助（～2018/3）' />
        </div>
      </Section>
    </Layout>
  );
};

export default IndexPage;
