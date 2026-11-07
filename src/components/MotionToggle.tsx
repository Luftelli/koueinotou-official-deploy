import React from 'react';
import { setMotionPaused, useMotionPaused, useReducedMotionByOS } from '../utility/motion';

/**
 * 背景、虹色の線、ループ動画をまとめて止めるボタン
 * OSで動きを減らしている場合は最初から止まっているため表示しない
 */
const MotionToggle: React.FC = () => {
  const paused = useMotionPaused();
  const isReducedByOS = useReducedMotionByOS();

  if (isReducedByOS) {
    return null;
  }

  const label = paused ? 'アニメーションを再生' : 'アニメーションを停止';

  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      onClick={() => setMotionPaused(!paused)}
      className='flex h-8 w-8 flex-none items-center justify-center border border-rule text-white transition-colors duration-200 hover:border-white'
    >
      <svg viewBox='0 0 16 16' fill='currentColor' aria-hidden='true' className='h-3.5 w-3.5'>
        <path d={paused ? 'M3 1.5v13L14 8Z' : 'M3 2h3.5v12H3Zm6.5 0H13v12H9.5Z'} />
      </svg>
    </button>
  );
};
export default MotionToggle;
