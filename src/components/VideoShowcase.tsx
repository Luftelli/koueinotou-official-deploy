import React, { useEffect, useRef, useState } from 'react';
import LoopVideo from './LoopVideo';

// 動画内のカットのつなぎと同じ長さにする
const fadeSeconds = 0.4;

interface VideoShowcaseItem {
  title: string;
  description: string;
  video: string;
  poster: string;
  label: string;
}

interface VideoShowcaseProps {
  items: readonly VideoShowcaseItem[];
}

/**
 * 大きな動画1枠と項目の一覧
 * 動画が終わると次の項目へ進み、項目を押すとその動画に切り替わる
 * 動画を重ねておき、透明度を変えることでフェードさせる
 */
const VideoShowcase: React.FC<VideoShowcaseProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextIndex = (activeIndex + 1) % items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // 見られるまでは次の動画を読み込まず、通信量を抑える
  useEffect(() => {
    const container = containerRef.current;
    if (container == null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      // 動画の再生開始と同じ条件にする
      { threshold: 0.5 },
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className='grid w-full gap-5 text-left lg:grid-cols-12 lg:gap-8'>
      <div className='relative aspect-video w-full self-start overflow-hidden border border-rule lg:col-span-8'>
        {items.map(({ video, poster, label }, index) => (
          <LoopVideo
            key={video}
            src={video}
            poster={poster}
            label={label}
            active={index === activeIndex}
            // 切り替え直後に再生できるよう、次の動画だけ先に読み込む
            preload={hasBeenVisible && index === nextIndex ? 'auto' : 'none'}
            onFadeOutStart={() => setActiveIndex(nextIndex)}
            fadeSeconds={fadeSeconds}
            className={`absolute inset-x-0 top-0 w-full transition-opacity duration-[400ms] ease-linear ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <ul className='flex flex-col gap-3 lg:col-span-4'>
        {items.map(({ title, description }, index) => (
          <li key={title} className='lg:flex-1'>
            <button
              type='button'
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`relative h-full w-full p-5 text-left transition-colors duration-200 ${
                index === activeIndex ? 'bg-black' : 'bg-black/60 hover:bg-black/80'
              }`}
            >
              <span className='block text-xl font-bold text-white'>{title}</span>
              <span className='mt-2 block leading-7 text-ink-dim'>{description}</span>
              {/* 再生中の項目はボタンと同じ虹色の線で示す */}
              {index === activeIndex && <span aria-hidden='true' className='light-bar' />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default VideoShowcase;
