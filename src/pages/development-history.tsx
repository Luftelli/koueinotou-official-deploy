import React, { useMemo } from 'react';
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
    cardDetailedText:
      '大学院の研究室メンバーCdec, S丼で続編が発売されない伝説のゲーム「カービィのエアライド」みたいなゲームを作ろう！ と意気投合し開発開始。カービィのエアライドの「シティトライアル」に、その時流行っていた「スプラトゥーン」のようなチーム対戦型オンライン対戦ゲームの要素を組み合わせることを考える。オンライン対戦ゲーム作ったことなかったのに……',
  },
  {
    title: '2017/6',
    cardTitle: 'プロトタイプ完成',
    cardDetailedText: 'Cdecがゴールデンウイークに作成。どこか見覚えがあるような……',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2017/6',
    cardTitle: 'Lui参戦',
    cardDetailedText:
      '大学の研究室メンバーLuiがサークルに加入。半年後のデジゲー博2017までに完成させるという無謀な計画を立てる。',
  },
  {
    title: '2017/6',
    cardTitle: 'Van参戦',
    cardDetailedText: 'S丼の友人Vanがサークルに加入。',
  },
  {
    title: '2017/11',
    cardTitle: 'デジゲー博2017出展',
    cardDetailedText:
      '全く完成せず、対戦ゲームにおいてプレイヤーによって対戦の結果が異なるという謎の状態で出展。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2018/3',
    cardTitle: '就活に伴い開発一時休止',
    cardDetailedText: '就活です。',
  },
  {
    title: '2018/6',
    cardTitle: '就活終了に伴い開発再開',
    cardDetailedText:
      '就活終わりました。改めて、デジゲー博2018までに完成させるという計画を立てる。果たして完成するのか……',
  },
  {
    title: '2018/7',
    cardTitle: 'Zip参戦',
    cardDetailedText: '期待の新人Zipがサークルに加入。',
  },
  {
    title: '2018/11',
    cardTitle: 'デジゲー博2018出展',
    cardDetailedText: 'また完成せず、',
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
    cardDetailedText: 'また完成せず、',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2019/4',
    cardTitle: '就職',
    cardDetailedText: 'Cdec, Lui, Vanが就職。今まで以上に時間取れなくなる。',
  },
  {
    title: '2019/11',
    cardTitle: 'デジゲー博2019出展',
    cardDetailedText: '相変わらず完成せず。しかし、ゲームとしての体は成すようになってきた。',
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
    cardDetailedText: '完成せず。ここ数年で一番完成に近い状態',
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
    cardDetailedText: '完成せず。一番完成に近かったといわれている2020年を超える完成に近い状態。',
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
    cardDetailedText: '公式サイト、Steamストアページをオープン。そろそろ公開かな……',
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
    cardDetailedText:
      '完成せず。完成しないことで完成とは何かを考えさせられるここ数年で一番の味わい深い完成に近い状態。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2022/11',
    cardTitle: 'デジゲー博2022出展',
    cardDetailedText:
      '完成せず。着実に完成の方向へは進んでいるため極限値を求めれば完成しているといえる状態。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2023/8',
    cardTitle: 'アーマードコア6発売',
    cardDetailedText:
      '続編が発売されない代表格であった「アーマードコア」の続編が10年ぶりに発売。同じく続編が発売されない「カービィのエアライド」の続編が出る確率が高まった気がしなくもない。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2023/11',
    cardTitle: 'デジゲー博2023出展',
    cardDetailedText:
      '完成せず。アンケートの結果は年々良くなっており極限まで完成に近づいているといえる状態。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2024/11',
    cardTitle: 'デジゲー博2024出展',
    cardDetailedText: '完成せず。精神的完成度は史上最高に高まっている状態。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2025/4',
    cardTitle: 'カービィのエアライダー発表',
    cardDetailedText: '光影の塔の存在意義が揺らぐ。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2025/8',
    cardTitle: '光影の塔開発終了を決定',
    cardDetailedText:
      'これ以上の機能追加は行わず、2025年度内に何らかの形で開発終了・公開することを決定。',
  },
  {
    title: '2025/11',
    cardTitle: 'デジゲー博2025出展（予定）',
    cardDetailedText: '最後の出展。',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
] as const;

const DevelopmentStatusPage = () => {
  const timelineItems = useMemo(() => [...items], []);

  return (
    <Layout>
      <h1 className='text-4xl'>開発の歴史</h1>
      <p>迷走の歴史</p>
      <Section className='gap-y-4 w-full'>
        <h2 className='text-3xl'>出来事</h2>
        <div className='w-full text-left'>
          <Chrono
            items={timelineItems}
            layout={{ cardWidth: 800 }}
            interaction={{ keyboardNavigation: true }}
            mode='vertical'
            theme={{
              primary: '#2dd4bf',
              secondary: '#5eead4',
              cardBgColor: '#111827',
              cardDetailsBackGround: '#111827',
              cardDetailsColor: '#f3f4f6',
              cardTitleColor: '#2dd4bf',
              cardSubtitleColor: '#d1d5db',
              titleColor: '#f3f4f6',
              titleColorActive: '#2dd4bf',
              iconBackgroundColor: '#2dd4bf',
              iconColor: '#2dd4bf',
              toolbarBgColor: '#1f2937',
              toolbarBtnBgColor: '#374151',
              toolbarTextColor: '#f3f4f6',
              detailsColor: '#f3f4f6',
            }}
            display={{
              borderless: false,
              pointShape: 'circle',
              toolbar: {
                enabled: false,
              },
            }}
          />
        </div>
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
              [
                '2022/1/10',
                '：塔リンクシステム（隣接する等を占拠すると塔同士が接続されるシステム）',
              ],
              [
                '2022/1/10',
                '：塔ワープ・ジャンプ（接続された塔を経由して占拠した塔にワープできるシステム）',
              ],
              ['2022/1/10', '：塔ジャンプ（一番近い占拠している塔にジャンプできるシステム）'],
              [
                '2022/1/10',
                '：サブサテライト（ドローンのような自動追尾の子機を発射できるシステム）',
              ],
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
              ['2022/1/10', '：重み付き塔リンクシステム'],
              ['2022/1/10', '：ヴァンサバ形式アイテム選択システム'],
              ['2022/1/10', '：ドッグファイトモード'],
            ]}
            className='text-base text-left'
          />
        </Box>
      </Section>

      <Section className='gap-y-4'>
        <h2 className='text-3xl'>開発に関する統計</h2>
        <Box>
          <TwoDevidedList
            items={[
              ['開発期間', '：8年5カ月（2017年5月～）'],
              ['ゲーム開発環境', '：Unity'],
              ['プログラミング環境', '：Rider'],
              ['プログラミング言語', '：C#, C++'],
              ['コード総数', '：50000行'],
              ['画像作成環境', '：ゲームシステム全般'],
              ['音楽加工環境', '：ゲームシステム全般'],
              ['効果音作成環境', '：ゲームシステム全般'],
              ['ミーティング回数', '：250回'],
              ['挨拶以外の議題がなかったミーティング回数', '：150回くらい'],
              ['開発期間中に出たiPhoneのシリーズ数', '：10'],
            ]}
            className='text-base text-left'
          />
        </Box>
      </Section>

      <Section className='gap-y-4'>
        <h2 className='text-3xl'>影響を受けた作品</h2>
        <Box>
          <TwoDevidedList
            items={[
              ['カービィのエアライド', '：始まりのきっかけ。ゲームシステム全般'],
              ['スプラトゥーンシリーズ', '：チームに分かれた領地争いのゲームシステム'],
              [
                'マリオカートシリーズ',
                '：アイテム取得・使用のゲームシステム、レースゲームとしての操作感覚',
              ],
              ['スターフォックスシリーズ', '：飛行時の操作感、照準の操作感'],
              ['アーマードコアⅥ', '：UIデザイン'],
              [
                'カービィのエアライダー',
                '：終わりのきっかけ。カービィのエアライドの正式な続編が公開されたことで、本作の開発終了を決断',
              ],
            ]}
            className='text-base text-left'
          />
        </Box>
      </Section>

      <Section className='gap-y-4'>
        <h2 className='text-3xl'>ゲーム本体以外の成果物</h2>
        <Box>
          <TwoDevidedList
            items={[
              ['マッチングサーバーシステム', '：ゲームシステム全般'],
              ['スプラトゥーンシリーズ', '：チームに分かれた領地争いのゲームシステム'],
            ]}
            className='text-base text-left'
          />
        </Box>
      </Section>
    </Layout>
  );
};

export default DevelopmentStatusPage;

export const Head = () => (
  <HeadBase pageTitle='開発履歴' pageDescription='開発に関する今までの履歴' />
);
