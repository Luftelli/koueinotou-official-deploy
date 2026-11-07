import React from 'react';

export type WorldTone = 'shadow' | 'light';

interface WorldProps {
  tone?: WorldTone;
  children: React.ReactNode;
}

const toneClassNames: Record<WorldTone, string> = {
  // 影の世界はパララックス背景をそのまま見せる
  shadow: 'relative w-full',
  light: 'world-light',
};

/**
 * ページを光と影の帯に分ける全幅の背景
 * 中に置いた部品の文字色や線の色も、この帯に合わせて切り替わる
 */
const World: React.FC<WorldProps> = ({ tone = 'shadow', children }) => (
  <div className={toneClassNames[tone]}>
    {tone === 'light' && <span aria-hidden='true' className='world-light-seam' />}
    {children}
  </div>
);
export default World;
