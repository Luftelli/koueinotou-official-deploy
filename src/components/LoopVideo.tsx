import React, { useEffect, useRef } from 'react';

interface LoopVideoProps {
  src: string;
  poster: string;
  label: string;
  // 指定するとループせず、再生が終わるfadeSeconds秒前に呼ばれる
  onFadeOutStart?: () => void;
  // フェードの長さ。フェード中は再生を続け、映像が止まって見えないようにする
  fadeSeconds?: number;
  // falseのあいだは再生しない。trueに戻ると先頭から再生する
  active?: boolean;
  preload?: 'none' | 'auto';
  className?: string;
}

/**
 * GIFアニメーションのように無音でループ再生する動画
 * 半分以上見えているときだけ再生し、動きを減らす設定の環境では静止画を表示する
 */
const LoopVideo: React.FC<LoopVideoProps> = ({
  src,
  poster,
  label,
  onFadeOutStart,
  fadeSeconds = 0,
  active = true,
  preload = 'none',
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onFadeOutStartRef = useRef(onFadeOutStart);

  useEffect(() => {
    onFadeOutStartRef.current = onFadeOutStart;
  }, [onFadeOutStart]);

  useEffect(() => {
    const video = videoRef.current;
    if (video == null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    // SSRではmuted属性が出力されないため、自動再生の前に設定する
    video.muted = true;

    if (!active) {
      const pauseTimeoutId = window.setTimeout(() => video.pause(), fadeSeconds * 1000);
      return () => window.clearTimeout(pauseTimeoutId);
    }
    video.currentTime = 0;

    let animationFrameId = 0;
    const watchPlaybackEnd = () => {
      if (video.duration - video.currentTime <= fadeSeconds) {
        onFadeOutStartRef.current?.();
        return;
      }
      animationFrameId = window.requestAnimationFrame(watchPlaybackEnd);
    };
    if (onFadeOutStartRef.current != null) {
      animationFrameId = window.requestAnimationFrame(watchPlaybackEnd);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // 素早いスクロールでは複数の結果がまとめて届くため、最新のものだけを見る
        if (entries[entries.length - 1].isIntersecting) {
          // 省電力モードなどで拒否された場合はポスターのまま表示する
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      // 複数の動画が同時に動かないよう、半分以上見えてから再生する
      { threshold: 0.5 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [active, fadeSeconds]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={label}
      width={960}
      height={540}
      muted
      loop={onFadeOutStart == null}
      playsInline
      preload={preload}
      className={`aspect-video h-auto ${className ?? ''}`}
    />
  );
};
export default LoopVideo;
