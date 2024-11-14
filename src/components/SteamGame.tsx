import React from 'react';

type SteamGameProps = {
  gameId: string;
  additionalQuery?: string;
  className?: string;
};

/**
 * 視覚的なグループ
 */
const SteamGame: React.FC<SteamGameProps> = ({ gameId, additionalQuery, className }) => (
  <div className={`w-full ${className ?? ''}`}>
    <iframe
      src={`https://store.steampowered.com/widget/${gameId}/${additionalQuery ?? ''}`}
      frameBorder='0'
      // 幅の動的調整
      width='100%'
      // デフォルトの高さ
      height='190'
      title='Steam Store Widget'
    />
  </div>
);
export default SteamGame;
