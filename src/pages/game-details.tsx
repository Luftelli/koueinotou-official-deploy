import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import Box from '../components/Box';
import HeadBase from '../components/HeadBase';
import Layout from '../components/Layout';
import LoopVideo from '../components/LoopVideo';
import Section from '../components/Section';
import SteamGame from '../components/SteamGame';
import VideoShowcase from '../components/VideoShowcase';
import YouTube from '../components/YouTube';

import DestructionVideo from '../images/game-details/destruction.mp4';
import DestructionPoster from '../images/game-details/destruction_poster.jpg';
import MachineVideo from '../images/game-details/machine.mp4';
import MachinePoster from '../images/game-details/machine_poster.jpg';
import OverdriveLightVideo from '../images/game-details/overdrive_light.mp4';
import OverdriveLightPoster from '../images/game-details/overdrive_light_poster.jpg';
import ExploreVideo from '../images/game-details/explore.mp4';
import ExplorePoster from '../images/game-details/explore_poster.jpg';
import HeroVideo from '../images/game-details/hero.mp4';
import HeroPoster from '../images/game-details/hero_poster.jpg';
import PowerUpVideo from '../images/game-details/power_up.mp4';
import PowerUpPoster from '../images/game-details/power_up_poster.jpg';
import AllIcon from '../images/powerup/all.png';
import AttackIcon from '../images/powerup/attack.png';
import ChargeIcon from '../images/powerup/charge.png';
import DefenceIcon from '../images/powerup/defence.png';
import FlightIcon from '../images/powerup/flight.png';
import SpeedIcon from '../images/powerup/speed.png';
import TurnIcon from '../images/powerup/turn.png';
import WeaponIcon from '../images/powerup/weapon.png';

const imageFrameClassName = 'w-full overflow-hidden border border-white/10 shadow-2xl shadow-black/30';

const matchSteps = [
  {
    title: 'チームに分かれて出撃',
    description: '光チームと影チームに分かれて対戦。人数が足りなければCPUが参加します。',
    image: (
      <StaticImage
        src='../images/game-details/rule_start.jpg'
        alt='「塔を壊して敵チームより多く占拠しろ」と表示された試合開始前の画面'
        width={480}
        aspectRatio={16 / 9}
        className='aspect-video w-full'
      />
    ),
  },
  {
    title: '壊しながら探索',
    description: 'オブジェクトを壊してパワーアップアイテムとエネルギーを集め、マシンを育てます。',
    image: (
      <StaticImage
        src='../images/game-details/rule_explore.jpg'
        alt='走りながらオブジェクトを破壊するマシン'
        width={480}
        aspectRatio={16 / 9}
        className='aspect-video w-full'
      />
    ),
  },
  {
    title: '塔を破壊して占拠',
    description: '敵や中立の塔を壊すと自チームの塔に。奪われた塔は取り返せます。',
    image: (
      <StaticImage
        src='../images/game-details/rule_tower.jpg'
        alt='攻撃を受けてブロック状に崩れ落ちる塔'
        width={480}
        aspectRatio={16 / 9}
        className='aspect-video w-full'
      />
    ),
  },
  {
    title: '塔のスコアで決着',
    description: '時間切れの時点で、塔の合計スコアが高いチームの勝利。同点なら引き分けです。',
    image: (
      <StaticImage
        src='../images/game-details/rule_result.jpg'
        alt='影チーム58点、光チーム11点で影チームが勝利した結果画面'
        width={480}
        aspectRatio={16 / 9}
        className='aspect-video w-full'
      />
    ),
  },
] as const;

const towerTypes = [
  {
    name: '中立の塔',
    description: 'どちらのチームのものでもない塔。早い者勝ちで占拠できます。',
    className: 'border-slate-300/40 text-slate-100',
    image: (
      <StaticImage
        src='../images/game-details/tower_neutral.jpg'
        alt='白と黒のまだら模様の中立の塔'
        width={480}
        aspectRatio={2 / 3}
        className='aspect-[2/3] w-full'
      />
    ),
  },
  {
    name: '光の塔',
    description: '光チームのスコアになる塔。影チームが壊すと奪われます。',
    className: 'border-amber-200/50 text-amber-200',
    image: (
      <StaticImage
        src='../images/game-details/tower_light.jpg'
        alt='黄色いらせんが巻きつく光の塔'
        width={480}
        aspectRatio={2 / 3}
        className='aspect-[2/3] w-full'
      />
    ),
  },
  {
    name: '影の塔',
    description: '影チームのスコアになる塔。光チームが壊すと奪われます。',
    className: 'border-indigo-400/60 text-indigo-300',
    image: (
      <StaticImage
        src='../images/game-details/tower_shadow.jpg'
        alt='紫のらせんが巻きつく影の塔'
        width={480}
        aspectRatio={2 / 3}
        className='aspect-[2/3] w-full'
      />
    ),
  },
] as const;

const conceptItems = [
  {
    title: '破壊する気持ちよさ',
    description:
      'ビルは物理挙動に従って崩れ落ちます。何を壊すと何が起こるのか、試したくなる爽快感が魅力です。',
    video: DestructionVideo,
    poster: DestructionPoster,
    label: '攻撃を受けた塔がブロック状に崩れ落ちるプレイ映像',
  },
  {
    title: '自分だけのマシン',
    description:
      '集めるパワーアップアイテムしだいで、マシンの性能は変わります。何を伸ばすかはあなたの自由です。',
    video: PowerUpVideo,
    poster: PowerUpPoster,
    label: 'パワーアップアイテムを次々に取得するプレイ映像',
  },
  {
    title: '探索',
    description:
      'エリアごとに景色はがらりと変わります。開始地点や塔の配置にはランダム性があり、試合のたびに新しい発見があります。',
    video: ExploreVideo,
    poster: ExplorePoster,
    label: 'エリアをまたぐたびに空や地面の色が変わるプレイ映像',
  },
] as const;

const machineActions = [
  {
    title: '走る',
    description: 'マシンは常に前へ進みます。スピード感のまま、ステージを駆け抜けましょう。',
  },
  {
    title: '飛ぶ',
    description: '段差から飛び出せば、そのまま空へ。地上と空の両方が戦場です。',
  },
  {
    title: '撃つ',
    description: '建物も塔も敵マシンも、狙って撃って壊せます。',
  },
  {
    title: '体当たりする',
    description:
      '素早く回転するスピンアタックと、力を溜めて一気に加速するチャージアタック。マシンごとぶつかって攻撃します。',
  },
] as const;

const powerUpItems = [
  { name: '攻撃', icon: AttackIcon, description: '与えるダメージがアップ' },
  { name: '防御', icon: DefenceIcon, description: '攻撃を受けても倒れにくくなる' },
  { name: '飛行', icon: FlightIcon, description: '空中での性能がアップ' },
  { name: '旋回', icon: TurnIcon, description: 'マシンの小回りが利くようになる' },
  { name: '速さ', icon: SpeedIcon, description: '移動スピードがアップ' },
  { name: '武器性能', icon: WeaponIcon, description: '武器の性能がアップ' },
  { name: 'チャージ', icon: ChargeIcon, description: 'チャージアタックの性能がアップ' },
  { name: '全能力', icon: AllIcon, description: 'すべての能力が一度にアップ' },
] as const;

const stages = [
  {
    name: 'ノナリア環状都市',
    reading: 'のなりあかんじょうとし',
    description:
      '同心円状に広がる巨大な人工都市。環をなす道路とネオンのビル群を駆け抜け、ビルを壊しまくりながら未来都市に立つ塔を奪い合います。',
    image: (
      <StaticImage
        src='../images/intro_winner.jpg'
        alt='ノナリア環状都市の全景'
        width={800}
        aspectRatio={16 / 9}
        className={imageFrameClassName}
      />
    ),
  },
  {
    name: '癸晶の城跡',
    reading: 'きしょうのしろあと',
    description:
      'ポリゴン調の木々や起伏に包まれた、多様なエリアからなる城の遺構のようなステージ。地下、地上、空中とステージを探索し、塔を見つけ出して占拠しましょう。',
    image: (
      <StaticImage
        src='../images/stage_kishou.jpg'
        alt='癸晶の城跡の水辺から城跡と上空の円環を見上げた風景'
        width={800}
        aspectRatio={16 / 9}
        className={imageFrameClassName}
      />
    ),
  },
] as const;

const gameModes = [
  {
    name: 'クイックマッチ',
    description: '集まったプレイヤーですぐに対戦。足りない人数はCPUが埋めます。',
  },
  {
    name: 'ルームマッチ',
    description: '友達とルームを作って対戦できます。',
  },
  {
    name: '練習',
    description: 'オフラインでCPUを相手に、自分のペースで遊べます。',
  },
  {
    name: 'チュートリアル',
    description: 'はじめての方でも、遊びながら基本を覚えられます。',
  },
] as const;

interface DetailSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * 目次からのアンカー先になる、見出し付きのセクション
 */
const DetailSection: React.FC<DetailSectionProps> = ({
  id,
  eyebrow,
  title,
  lead,
  className,
  children,
}) => (
  <section id={id} aria-labelledby={`${id}-title`} className='w-full scroll-mt-16'>
    <Section className={`gap-y-8 lg:gap-y-10 ${className ?? ''}`}>
      <div className='w-full text-left'>
        <p className='text-sm font-bold tracking-[0.3em] text-cyan-300'>{eyebrow}</p>
        <h2 id={`${id}-title`} className='mt-3 text-3xl font-bold text-white sm:text-4xl'>
          {title}
        </h2>
        {lead != null && (
          <p className='mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg'>{lead}</p>
        )}
      </div>
      {children}
    </Section>
  </section>
);

const GameDetailsPage = () => (
  <Layout>
    <Section className='gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:text-left'>
      <div className='flex w-full flex-col items-start gap-5 text-left lg:col-span-6'>
        <p className='text-sm font-bold tracking-[0.3em] text-cyan-300'>ABOUT THE GAME</p>
        <h1 className='text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.2] tracking-tight text-white'>
          「<span className='text-amber-200'>光</span>
          <span className='text-indigo-400'>影</span>の塔」とは
        </h1>
        <p className='text-base leading-8 text-slate-300 sm:text-lg'>
          壊して、育てて、塔を奪う。光と影の2チームに分かれて戦う、オンライン対戦型3Dシューティングです。どんなゲームなのかを紹介します。
        </p>
      </div>
      <div className='w-full lg:col-span-6'>
        <LoopVideo
          src={HeroVideo}
          poster={HeroPoster}
          label='ステージを走りながら塔を撃ち、オブジェクトを破壊するプレイ映像'
          className={imageFrameClassName}
        />
      </div>
    </Section>

    <DetailSection
      id='overview'
      eyebrow='OVERVIEW'
      title='ゲーム概要'
      lead='舞台は、破壊できるオブジェクトであふれたステージ。プレイヤーはマシンに乗り込み、道すがら建物を壊して強くなりながら、ステージに散らばる塔を探し出して占拠します。'
    >
      <VideoShowcase items={conceptItems} />
    </DetailSection>

    <DetailSection
      id='rules'
      eyebrow='RULES'
      title='ルール'
      lead={
        <>
          勝敗を決めるのは撃破数ではなく、<strong className='text-white'>塔のスコア</strong>
          です。敵を妨害しつつ、塔を積極的に占拠していきましょう。
        </>
      }
    >
      <ol className='grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-2 xl:grid-cols-4'>
        {matchSteps.map(({ title, description, image }, index) => (
          <li key={title} className='overflow-hidden border-t-2 border-cyan-400/60 bg-slate-900/70'>
            {image}
            <div className='p-5'>
              <p className='text-sm font-bold tracking-widest text-cyan-300'>STEP {index + 1}</p>
              <h3 className='mt-2 text-xl font-bold text-white'>{title}</h3>
              <p className='mt-3 leading-7 text-slate-300'>{description}</p>
            </div>
          </li>
        ))}
      </ol>
      <Box>
        <div className='grid gap-6 text-left lg:grid-cols-2 lg:gap-10'>
          <div>
            <h3 className='text-xl font-bold text-cyan-200'>撃破されると</h3>
            <p className='mt-3 leading-7 text-slate-300'>
              パワーアップアイテムを一部落としますが、すぐに復帰して戦線に戻れます。HPは多めなので、対人戦が苦手でも大丈夫です。
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold text-cyan-200'>負けていても逆転できる</h3>
            <p className='mt-3 leading-7 text-slate-300'>
              塔は何度でも奪い返せるうえ、劣勢のチームはオーバードライブゲージがたまりやすくなります。最後まであきらめずに逆転を狙いましょう。
            </p>
          </div>
        </div>
      </Box>
    </DetailSection>

    <DetailSection
      id='towers'
      eyebrow='TOWERS'
      title='塔'
      lead='塔は「中立」「光」「影」の3種類。自チーム以外の塔を破壊すると、その塔は自チームのものになり、スコアが入ります。'
    >
      <ul className='grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-3'>
        {towerTypes.map(({ name, description, className, image }) => (
          <li key={name} className={`overflow-hidden border-t-4 bg-slate-900/70 ${className}`}>
            {image}
            <div className='p-5'>
              <h3 className='text-xl font-bold'>{name}</h3>
              <p className='mt-2 leading-7 text-slate-300'>{description}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className='grid w-full grid-cols-1 gap-5 text-left leading-7 text-slate-300 lg:grid-cols-2'>
        <li className='bg-slate-900/70 p-5'>
          <strong className='mb-2 block text-lg text-white'>塔は何度でも奪い合える</strong>
          壊された塔は再生します。一度占拠して終わりではなく、取って取られての攻防が続きます。
        </li>
        <li className='bg-slate-900/70 p-5'>
          <strong className='mb-2 block text-lg text-white'>レア塔は高得点</strong>
          希少なレア塔を占拠すると、大きなスコアを獲得できます。見つけたら逃さず破壊して占拠しましょう。
        </li>
      </ul>
    </DetailSection>

    <DetailSection
      id='machine'
      eyebrow='MACHINE'
      title='マシン'
      lead='操作はシンプル。難しいことを考えなくても、走って飛んで撃つだけで気持ちよく遊べます。'
    >
      <div className='grid w-full items-center gap-5 text-left lg:grid-cols-12 lg:gap-8'>
        <div className='lg:col-span-7'>
          <LoopVideo
            src={MachineVideo}
            poster={MachinePoster}
            label='夜空を飛ぶ場面、オブジェクトを撃って壊す場面、力を溜めて加速し、塔へ突っ込んで砕く場面のプレイ映像'
            className={imageFrameClassName}
          />
        </div>
        <dl className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5'>
          {machineActions.map(({ title, description }) => (
            <div key={title} className='bg-slate-900/70 p-5'>
              <dt className='text-xl font-bold text-white'>{title}</dt>
              <dd className='mt-2 leading-7 text-slate-300'>{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </DetailSection>

    <DetailSection
      id='power-up'
      eyebrow='POWER UP'
      title='パワーアップ'
      lead='オブジェクトを壊すと現れるパワーアップアイテムは全8種類。取ったアイテムの効果は自分のマシンだけに反映されるので、チーム内で役割を分けるのも手です。'
    >
      <ul className='grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 xl:grid-cols-4'>
        {powerUpItems.map(({ name, icon, description }) => (
          <li key={name} className='flex items-center gap-4 bg-slate-900/70 p-4'>
            <img src={icon} alt='' width={64} height={64} loading='lazy' className='h-16 w-16 flex-none' />
            <div className='min-w-0'>
              <h3 className='text-lg font-bold text-white'>{name}</h3>
              <p className='mt-1 text-sm leading-6 text-slate-300'>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </DetailSection>

    <DetailSection
      id='overdrive'
      eyebrow='OVERDRIVE'
      title='オーバードライブ'
      lead='ステージを壊してゲージを貯めれば、マシンが一定時間圧倒的な強さに。敵もオブジェクトも塔もなりふり構わず壊しまくれ！'
    >
      <div className='grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-7'>
          <LoopVideo
            src={OverdriveLightVideo}
            poster={OverdriveLightPoster}
            label='オーバードライブ中のマシンが光の球をまとって突き進むプレイ映像'
            className={imageFrameClassName}
          />
        </div>
        <Box className='lg:col-span-5'>
          <div className='flex flex-col gap-6 text-left'>
            <div>
              <h3 className='text-xl font-bold text-amber-200'>能力が大幅アップ</h3>
              <p className='mt-3 leading-7 text-slate-300'>
                発動中はマシンの能力が劇的に上昇。しかも無限に飛べるようになります。
              </p>
            </div>
            <div>
              <h3 className='text-xl font-bold text-amber-200'>ビームを撃ち放題</h3>
              <p className='mt-3 leading-7 text-slate-300'>
                過剰に射程が長く異様に強力なビームで、目の前はもちろん広範囲を壊し尽くせます。
              </p>
            </div>
            <div>
              <h3 className='text-xl font-bold text-amber-200'>形勢を変える一手に</h3>
              <p className='mt-3 leading-7 text-slate-300'>
                塔をまとめて奪う、高得点の塔を破壊する、敵を蹂躙する。使いどころが勝敗を分けます。
              </p>
            </div>
          </div>
        </Box>
      </div>
    </DetailSection>

    <DetailSection
      id='stages'
      eyebrow='STAGES'
      title='ステージ'
      lead='まったく雰囲気の異なる2つのステージを収録しています。'
    >
      <div className='grid w-full grid-cols-1 gap-8 text-left lg:grid-cols-2'>
        {stages.map(({ name, reading, description, image }) => (
          <div key={name} className='flex flex-col gap-4'>
            {image}
            <h3 className='text-2xl font-bold text-white'>
              <ruby>
                {name}
                <rp>（</rp>
                <rt className='text-xs font-normal text-slate-400'>{reading}</rt>
                <rp>）</rp>
              </ruby>
            </h3>
            <p className='leading-7 text-slate-300'>{description}</p>
          </div>
        ))}
      </div>
    </DetailSection>

    <DetailSection
      id='modes'
      eyebrow='GAME MODES'
      title='ゲームモード'
      lead='オンラインでも、ひとりでも遊べます。Steam実績も用意しています。'
    >
      <ul className='grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-2 xl:grid-cols-4'>
        {gameModes.map(({ name, description }) => (
          <li key={name} className='bg-slate-900/70 p-5'>
            <h3 className='text-xl font-bold text-cyan-200'>{name}</h3>
            <p className='mt-3 leading-7 text-slate-300'>{description}</p>
          </li>
        ))}
      </ul>
    </DetailSection>

    <DetailSection id='movie' eyebrow='MOVIE' title='紹介映像'>
      <YouTube
        embedId='xlILRvLVTP8?si=u1KGNydJKVd9dQwz'
        aspectRatio={16.0 / 9.0}
        className='flex w-full max-w-5xl flex-grow overflow-hidden border border-white/10 bg-black shadow-2xl shadow-cyan-900/40'
      />
    </DetailSection>

    <Section className='gap-y-6'>
      <h2 className='text-2xl font-bold leading-relaxed sm:text-3xl'>
        Steamでウィッシュリストに登録
      </h2>
      <div className='w-full max-w-xl'>
        <SteamGame
          gameId='1822700'
          additionalQuery='?utm_source=koueinotou_hopmepage&utm_medium=referral&utm_campaign=permanent'
        />
      </div>
      <p className='text-sm text-slate-400'>
        掲載内容は開発中のものであり、変更になる場合があります。
      </p>
    </Section>
  </Layout>
);

export default GameDetailsPage;

export const Head = () => (
  <HeadBase
    pageTitle='ゲーム紹介'
    pageDescription='光と影に分かれて塔を奪い合う、オンライン対戦型3Dシューティング「光影の塔」がどんなゲームなのかを紹介します。'
  />
);
