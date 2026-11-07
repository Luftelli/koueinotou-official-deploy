import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import HeadBase from '../components/HeadBase';
import Layout from '../components/Layout';
import LoopVideo from '../components/LoopVideo';
import MenuHeading from '../components/MenuHeading';
import Section from '../components/Section';
import SteamGame from '../components/SteamGame';
import SectionNav from '../components/SectionNav';
import VideoShowcase from '../components/VideoShowcase';
import World, { WorldTone } from '../components/World';
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

const imageFrameClassName = 'w-full overflow-hidden border border-rule';

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
    className: 'border-white',
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
    className: 'border-hikari',
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
    className: 'border-kage',
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

const sectionNavItems = [
  { id: 'overview', label: 'ゲーム概要' },
  { id: 'rules', label: 'ルール' },
  { id: 'towers', label: '塔' },
  { id: 'machine', label: 'マシン' },
  { id: 'power-up', label: 'パワーアップ' },
  { id: 'overdrive', label: 'オーバードライブ' },
  { id: 'stages', label: 'ステージ' },
  { id: 'modes', label: 'ゲームモード' },
  { id: 'movie', label: '紹介映像' },
] as const;

interface DetailSectionProps {
  id: (typeof sectionNavItems)[number]['id'];
  tone?: WorldTone;
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
  tone = 'shadow',
  title,
  lead,
  className,
  children,
}) => (
  <section id={id} aria-labelledby={`${id}-title`} className='w-full'>
    <World tone={tone}>
      <Section
        className={`gap-y-8 lg:gap-y-10 ${tone === 'shadow' ? '' : '!py-8 lg:!py-10'} ${className ?? ''}`}
      >
        <div className='w-full text-left'>
          <MenuHeading id={`${id}-title`}>{title}</MenuHeading>
          {lead != null && (
            <p className='info-back mt-5 max-w-[46rem] text-base leading-8 text-ink-dim sm:text-lg'>
              {lead}
            </p>
          )}
        </div>
        {children}
      </Section>
    </World>
  </section>
);

const GameDetailsPage = () => (
  <Layout>
    <Section className='gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:text-left'>
      <div className='flex w-full flex-col items-start gap-5 text-left lg:col-span-5'>
        <MenuHeading as='h1'>「光影の塔」とは</MenuHeading>
        <p className='info-back max-w-[34rem] text-base leading-8 text-ink-dim sm:text-lg'>
          壊して、育てて、塔を奪う。光と影の2チームに分かれて戦う、オンライン対戦型3Dシューティングです。どんなゲームなのかを紹介します。
        </p>
      </div>
      <div className='w-full lg:col-span-7'>
        <LoopVideo
          src={HeroVideo}
          poster={HeroPoster}
          label='ステージを走りながら塔を撃ち、オブジェクトを破壊するプレイ映像'
          className={imageFrameClassName}
        />
      </div>
    </Section>

    <SectionNav items={sectionNavItems} />

    <DetailSection
      id='overview'
      title='ゲーム概要'
      lead='舞台は、破壊できるオブジェクトであふれたステージ。プレイヤーはマシンに乗り込み、道すがら建物を壊して強くなりながら、ステージに散らばる塔を探し出して占拠します。'
    >
      <VideoShowcase items={conceptItems} />
    </DetailSection>

    <DetailSection
      id='rules'
      tone='light'
      title='ルール'
      lead={
        <>
          勝敗を決めるのは撃破数ではなく、<strong className='text-ink'>塔のスコア</strong>
          です。敵を妨害しつつ、塔を積極的に占拠していきましょう。
        </>
      }
    >
      <ol className='grid w-full grid-cols-1 gap-x-5 gap-y-8 text-left sm:grid-cols-2 xl:grid-cols-4'>
        {matchSteps.map(({ title, description, image }, index) => (
          <li key={title}>
            {image}
            <div className='relative mt-4 flex gap-3 pt-4'>
              <span aria-hidden='true' className='light-bar light-bar-top' />
              <p aria-hidden='true' className='text-4xl font-bold leading-none'>
                {index + 1}
              </p>
              <div className='min-w-0'>
                <h3 className='text-xl font-bold'>{title}</h3>
                <p className='mt-2 leading-7 text-ink-dim'>{description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      {/* 白い帯の中なので面は敷かず、手順と同じく文字だけで並べる */}
      <div className='grid w-full gap-6 border-t border-rule pt-8 text-left lg:grid-cols-2 lg:gap-10'>
        <div>
          <h3 className='text-xl font-bold'>撃破されると</h3>
          <p className='mt-3 leading-7 text-ink-dim'>
            パワーアップアイテムを一部落としますが、すぐに復帰して戦線に戻れます。HPは多めなので、対人戦が苦手でも大丈夫です。
          </p>
        </div>
        <div>
          <h3 className='text-xl font-bold'>負けていても逆転できる</h3>
          <p className='mt-3 leading-7 text-ink-dim'>
            塔は何度でも奪い返せるうえ、劣勢のチームはオーバードライブゲージがたまりやすくなります。最後まであきらめずに逆転を狙いましょう。
          </p>
        </div>
      </div>
    </DetailSection>

    <DetailSection
      id='towers'
      title='塔'
      lead='塔は「中立」「光」「影」の3種類。自チーム以外の塔を破壊すると、その塔は自チームのものになり、スコアが入ります。'
    >
      <div className='grid w-full gap-8 text-left lg:grid-cols-12 lg:items-start'>
        <ul className='grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-8'>
          {towerTypes.map(({ name, description, className, image }) => (
            <li key={name} className='grid grid-cols-[6.5rem_1fr] items-center gap-4 sm:block'>
              <div className={`border-t-4 ${className}`}>{image}</div>
              <div>
                <h3 className='text-xl font-bold sm:mt-4'>{name}</h3>
                <p className='mt-2 leading-7 text-ink-dim'>{description}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className='info-back flex flex-col gap-6 leading-7 text-ink-dim lg:col-span-4'>
          <li>
            <strong className='mb-2 block text-lg text-ink'>塔は何度でも奪い合える</strong>
            壊された塔は再生します。一度占拠して終わりではなく、取って取られての攻防が続きます。
          </li>
          <li>
            <strong className='mb-2 block text-lg text-ink'>レア塔は高得点</strong>
            希少なレア塔を占拠すると、大きなスコアを獲得できます。見つけたら逃さず破壊して占拠しましょう。
          </li>
        </ul>
      </div>
    </DetailSection>

    <DetailSection
      id='machine'
      tone='light'
      title='マシン'
      lead='操作はシンプル。難しいことを考えなくても、走って飛んで撃つだけで気持ちよく遊べます。'
    >
      <div className='grid w-full items-center gap-5 text-left lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-7'>
          <LoopVideo
            src={MachineVideo}
            poster={MachinePoster}
            label='夜空を飛ぶ場面、オブジェクトを撃って壊す場面、力を溜めて加速し、塔へ突っ込んで砕く場面のプレイ映像'
            className={imageFrameClassName}
          />
        </div>
        <dl className='divide-y divide-rule lg:col-span-5'>
          {machineActions.map(({ title, description }) => (
            <div key={title} className='py-4'>
              <dt className='text-2xl font-medium'>{title}</dt>
              <dd className='mt-1 leading-7 text-ink-dim'>{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </DetailSection>

    <DetailSection
      id='power-up'
      title='パワーアップ'
      lead='オブジェクトを壊すと現れるパワーアップアイテムは全8種類。取ったアイテムの効果は自分のマシンだけに反映されるので、チーム内で役割を分けるのも手です。'
    >
      <ul className='info-back grid w-full grid-cols-1 gap-x-8 gap-y-6 text-left sm:grid-cols-2 xl:grid-cols-4'>
        {powerUpItems.map(({ name, icon, description }) => (
          <li key={name} className='flex items-center gap-4'>
            <img
              src={icon}
              alt=''
              width={64}
              height={64}
              loading='lazy'
              className='h-16 w-16 flex-none'
            />
            <div className='min-w-0'>
              <h3 className='text-lg font-bold'>{name}</h3>
              <p className='mt-1 text-sm leading-6 text-ink-dim'>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </DetailSection>

    <DetailSection
      id='overdrive'
      tone='light'
      title='オーバードライブ'
      lead='ステージを壊してゲージを貯めれば、マシンが一定時間圧倒的な強さに。敵もオブジェクトも塔もなりふり構わず壊しまくれ！'
    >
      <div className='grid w-full items-center gap-8 text-left lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-7'>
          <LoopVideo
            src={OverdriveLightVideo}
            poster={OverdriveLightPoster}
            label='オーバードライブ中のマシンが光の球をまとって突き進むプレイ映像'
            className={imageFrameClassName}
          />
        </div>
        <div className='flex flex-col gap-6 lg:col-span-5'>
          <div>
            <h3 className='text-xl font-bold'>能力が大幅アップ</h3>
            <p className='mt-2 leading-7 text-ink-dim'>
              発動中はマシンの能力が劇的に上昇。しかも無限に飛べるようになります。
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold'>ビームを撃ち放題</h3>
            <p className='mt-2 leading-7 text-ink-dim'>
              過剰に射程が長く異様に強力なビームで、目の前はもちろん広範囲を壊し尽くせます。
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold'>形勢を変える一手に</h3>
            <p className='mt-2 leading-7 text-ink-dim'>
              塔をまとめて奪う、高得点の塔を破壊する、敵を蹂躙する。使いどころが勝敗を分けます。
            </p>
          </div>
        </div>
      </div>
    </DetailSection>

    <DetailSection
      id='stages'
      title='ステージ'
      lead='まったく雰囲気の異なる2つのステージを収録しています。'
    >
      <div className='grid w-full grid-cols-1 gap-8 text-left lg:grid-cols-2'>
        {stages.map(({ name, reading, description, image }) => (
          <div key={name} className='info-back flex flex-col gap-4'>
            {image}
            <h3 className='text-2xl font-bold'>
              <ruby>
                {name}
                <rp>（</rp>
                <rt className='text-xs font-normal text-ink-dim'>{reading}</rt>
                <rp>）</rp>
              </ruby>
            </h3>
            <p className='leading-7 text-ink-dim'>{description}</p>
          </div>
        ))}
      </div>
    </DetailSection>

    <DetailSection
      id='modes'
      tone='light'
      title='ゲームモード'
      lead='オンラインでも、ひとりでも遊べます。Steam実績も用意しています。'
    >
      <dl className='grid w-full grid-cols-1 gap-x-10 text-left lg:grid-cols-2'>
        {gameModes.map(({ name, description }) => (
          <div key={name} className='border-b border-rule py-4'>
            <dt className='text-2xl font-medium'>{name}</dt>
            <dd className='mt-1 leading-7 text-ink-dim'>{description}</dd>
          </div>
        ))}
      </dl>
    </DetailSection>

    <DetailSection id='movie' title='紹介映像'>
      <YouTube
        embedId='xlILRvLVTP8?si=u1KGNydJKVd9dQwz'
        aspectRatio={16.0 / 9.0}
        title='「光影の塔」紹介映像'
        className='flex w-full max-w-5xl flex-grow overflow-hidden border border-rule bg-black'
      />
    </DetailSection>

    <Section className='gap-y-6'>
      <MenuHeading>Steamでウィッシュリストに登録</MenuHeading>
      <SteamGame
        gameId='1822700'
        additionalQuery='?utm_source=koueinotou_hopmepage&utm_medium=referral&utm_campaign=permanent'
      />
      <p className='text-sm text-ink-dim'>
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
