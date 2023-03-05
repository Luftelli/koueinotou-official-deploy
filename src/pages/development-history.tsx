import React from 'react';
import { Chrono } from 'react-chrono';
import Layout from '../components/Layout';

import Section from '../components/Section';
import TwoDevidedList from '../components/TwoDevidedList';
import Box from '../components/Box';
import HeadBase from '../components/HeadBase';

const items = [
  {
    title: '2017/5',
    cardTitle: '開発開始',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2017/11',
    cardTitle: 'デジゲー博2017出展',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2018/11',
    cardTitle: 'デジゲー博2018出展',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2019/11',
    cardTitle: 'デジゲー博2019出展',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2020/11',
    cardTitle: 'デジゲー博2020出展',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2021/11',
    cardTitle: 'デジゲー博2021出展',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2022/1',
    cardTitle: '公式サイト・Steamストアページオープン',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2022/6',
    cardTitle: 'IGC2022出展',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
] as const;

const DevelopmentStatusPage = () => (
  <Layout>
    <h1 className='text-4xl'>開発履歴</h1>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>イベント</h2>
      <Chrono
        items={[...items]}
        mode='VERTICAL_ALTERNATING'
        hideControls
        theme={{
          primary: '#2dd4bf',
          secondary: 'white',
          cardBgColor: '#374151',
          cardForeColor: 'white',
          titleColor: 'black',
        }}
      />
    </Section>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>実装し採用した要素</h2>
      <Box>
        <TwoDevidedList
          items={[
            ['2017/5', '：プレイヤー基本操作'],
            ['2017/', '：パワーアップアイテム'],
            ['2017/10', '：ネットワーク同期'],
            ['2022/1/10', '：ルームマッチ'],
            ['2021/11/14', '：チーム領域'],
            ['2021/11/14', '：武器取得システム'],
            ['2021/11/14', '：未来都市ステージ'],
            ['2021/11/14', '：オセロ空間ステージ'],
          ]}
          className='text-base text-left'
        />
      </Box>
    </Section>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>実装したが没になった要素</h2>
      <Box>
        <TwoDevidedList
          items={[
            [
              '2022/1/10',
              '：乗り物乗り換え（ステージに落ちている別の乗り物に乗り換えられるシステム）',
            ],
            ['2022/1/10', '：塔リンクシステム（隣接する等を占拠すると塔同士が接続されるシステム）'],
            [
              '2022/1/10',
              '：塔ワープ・ジャンプ（接続された塔を経由して占拠した塔にワープできるシステム）',
            ],
            ['2022/1/10', '：塔ジャンプ（一番近い占拠している塔にジャンプできるシステム）'],
            ['2022/1/10', '：サブサテライト（ドローンのような自動追尾の子機を発射できるシステム）'],
            ['2022/1/10', '：破壊可能なビル（攻撃すると破片に分かれ壊せるビル）'],
            [
              '2022/1/10',
              '：スペシャルアタック（スペシャルゲージがたまると使用できる強力な攻撃。武器取得システムに統合）',
            ],
            ['2022/1/10', '：第1ステージ（デジゲー博2017時に作成したステージ）'],
            ['2022/1/10', '：第2ステージ（デジゲー博2018時に作成したステージ）'],
            ['2022/1/10', '：第3ステージ（デジゲー博2019時に作成したステージ）'],
            ['2022/1/10', '：第4ステージ（デジゲー博2020時に作成したステージ）'],
            ['2022/1/10', '：第5ステージ（）'],
          ]}
          className='text-base text-left'
        />
      </Box>
    </Section>

    <Section className='gap-y-4'>
      <h2 className='text-3xl'>検討したが実装しなかった要素</h2>
      <Box>
        <TwoDevidedList
          items={[
            [
              '2022/1/10',
              '：乗り物乗り換え（ステージに落ちている別の乗り物に乗り換えられるシステム）',
            ],
            ['2022/1/10', '：塔リンクシステム（隣接する等を占拠すると塔同士が接続されるシステム）'],
            [
              '2022/1/10',
              '：塔ワープ・ジャンプ（接続された塔を経由して占拠した塔にワープできるシステム）',
            ],
            ['2022/1/10', '：塔ジャンプ（一番近い占拠している塔にジャンプできるシステム）'],
            ['2022/1/10', '：サブサテライト（ドローンのような自動追尾の子機を発射できるシステム）'],
            ['2022/1/10', '：破壊可能なビル（攻撃すると破片に分かれ壊せるビル）'],
            [
              '2022/1/10',
              '：スペシャルアタック（スペシャルゲージがたまると使用できる強力な攻撃。武器取得システムに統合）',
            ],
            ['2022/1/10', '：第1ステージ（デジゲー博2017時に作成したステージ）'],
            ['2022/1/10', '：第2ステージ（デジゲー博2018時に作成したステージ）'],
            ['2022/1/10', '：第3ステージ（デジゲー博2019時に作成したステージ）'],
            ['2022/1/10', '：第4ステージ（デジゲー博2020時に作成したステージ）'],
            ['2022/1/10', '：第5ステージ（）'],
          ]}
          className='text-base text-left'
        />
      </Box>
    </Section>
  </Layout>
);

export default DevelopmentStatusPage;

export const Head = () => (
  <HeadBase pageTitle='開発履歴' pageDescription='開発に関する今までの履歴' />
);
