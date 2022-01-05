import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import Box from '../components/Box';
import Button from '../components/Button';
import DeveloperCard from '../components/DeveloperCard';
import Layout from '../components/Layout';
import Section from '../components/Section';

const IndexPage = () => {
  return (
    <Layout>
      <StaticImage src='../images/header.jpg' alt='Header' className='flex-none w-full' />
      <Section>
        <p className='text-4xl'>
          光と影に分かれて戦う
          <br />
          オンライン対戦型3Dシューティング
        </p>
      </Section>

      <Section>
        <p className='text-xl'>ダウンロードはこちら</p>
        <Button className='flex-none'>Steam</Button>
      </Section>

      <Section>
        <p className='text-2xl'>パワーアップアイテムを集め</p>
        <p className='text-2xl'>武器を拾い</p>
        <p className='text-2xl'>塔を壊す</p>
      </Section>

      <Section className='gap-y-4'>
        <div className='flex justify-center w-full gap-x-4'>
          <Button className='flex-none'>ゲームシステム</Button>
          <Button className='flex-none'>開発状況</Button>
        </div>
        <div className='flex justify-center w-full gap-x-4'>
          <Button className='flex-none'>お問い合わせ</Button>
          <Button className='flex-none'>利用規約</Button>
          <Button className='flex-none'>ガイドライン</Button>
        </div>
      </Section>

      <Section className='gap-y-2'>
        <h2 className='text-3xl'>ギャラリー</h2>
        <StaticImage src='../images/ss1.jpg' alt='Screen Shot 1' />
      </Section>

      <Section className='gap-y-2'>
        <h2 className='text-3xl'>ニュース</h2>
        <Box>
          <ul className='text-lg text-left text-black'>
            <li>2022/1/10：公式サイトオープン</li>
            <li>2021/11/14：デジゲー博2021出展</li>
          </ul>
        </Box>
      </Section>

      <Section className='gap-y-2'>
        <h2 className='text-3xl'>スペック</h2>
        <Box>
          <ul className='text-lg text-left text-black'>
            <li>ゲームタイトル：光影の塔</li>
            <li>価格：未定</li>
            <li>発売日：2022年8月予定</li>
            <li>対応プレイ人数：1-8人</li>
            <li>対応プラットフォーム：Windows, MacOS X（予定）</li>
            <li>対応言語：日本語、英語（予定）</li>
            <li>対応年齢：全年齢</li>
            <li>ネットワーク機能：あり</li>
            <li>開発チーム名：Luftelli</li>
          </ul>
        </Box>
      </Section>

      <Section className='gap-y-2'>
        <h2 className='text-3xl'>開発者</h2>
        <div className='grid grid-cols-2 w-full gap-4'>
          <DeveloperCard
            icon='cdec_icon_v2.1.png'
            name='Cdec'
            twitter='cdecpgl'
            charge='全般担当'
          />
          <DeveloperCard name='Lui' charge='開発補助' />
          <DeveloperCard name='Van' charge='デバッグ担当' />
          <DeveloperCard
            icon='zip_icon.jpg'
            name='Zip'
            twitter='ziiiii_iiiiip'
            charge='開発補助'
            supplement='（2018/7～）'
          />
          <DeveloperCard
            name='S丼'
            twitter='S_don_Luftelli'
            charge='プログラム補助'
            supplement='（～2018/3）'
          />
        </div>
      </Section>
    </Layout>
  );
};

export default IndexPage;
