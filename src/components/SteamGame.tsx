import React, { useEffect, useRef, useState } from 'react';

interface SteamGameProps {
  gameId: string;
  additionalQuery?: string;
  className?: string;
}

// Steamのウィジェットはこの大きさの固定レイアウトで作られている
const widgetWidth = 646;
const widgetHeight = 190;

/**
 * Steamの公式ウィジェット
 * 幅を詰めると中身が崩れるため、狭い画面でもレイアウトは変えず全体を縮小する
 */
const SteamGame: React.FC<SteamGameProps> = ({ gameId, additionalQuery, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (container == null) {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / widgetWidth));
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[646px] overflow-hidden ${className ?? ''}`}
      style={{ aspectRatio: `${widgetWidth} / ${widgetHeight}` }}
    >
      <iframe
        src={`https://store.steampowered.com/widget/${gameId}/${additionalQuery ?? ''}`}
        frameBorder='0'
        width={widgetWidth}
        height={widgetHeight}
        title='Steamストアのウィジェット'
        loading='lazy'
        className='absolute left-0 top-0 origin-top-left'
        // 埋め込み先はライト配色のため、ページの暗い配色と食い違って白い背景が付かないよう揃える
        style={{ transform: `scale(${scale})`, colorScheme: 'light' }}
      />
    </div>
  );
};
export default SteamGame;
