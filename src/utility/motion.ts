import { useSyncExternalStore } from 'react';

const storageKey = 'motion-paused';
const changeEventName = 'motion-paused-change';

const isMotionPausedByUser = (): boolean => document.documentElement.dataset.motion === 'paused';

/**
 * OSの動きを減らす設定か、サイト内の停止ボタンで動きが止められているか
 */
export const isMotionStopped = (): boolean =>
  isMotionPausedByUser() || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const setMotionPaused = (paused: boolean): void => {
  if (paused) {
    document.documentElement.dataset.motion = 'paused';
  } else {
    delete document.documentElement.dataset.motion;
  }

  // ストレージが使えない環境でも、表示中のページでは停止を効かせる
  try {
    window.localStorage.setItem(storageKey, String(paused));
  } catch {
    // 次回の訪問で設定が復元されないだけなので無視する
  }
  window.dispatchEvent(new Event(changeEventName));
};

/**
 * 前回の訪問で止めた動きを、描画が始まる前に復元する
 */
export const restoreMotionPaused = (): void => {
  try {
    if (window.localStorage.getItem(storageKey) === 'true') {
      document.documentElement.dataset.motion = 'paused';
    }
  } catch {
    // ストレージが使えない場合は既定どおり動かす
  }
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(changeEventName, onChange);
  return () => window.removeEventListener(changeEventName, onChange);
};

export const useMotionPaused = (): boolean =>
  useSyncExternalStore(subscribe, isMotionPausedByUser, () => false);

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

export const useReducedMotionByOS = (): boolean =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
