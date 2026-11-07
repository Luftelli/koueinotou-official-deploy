import React from 'react';

interface YouTubeProps {
  embedId: string;
  aspectRatio: number;
  title?: string;
  className?: string;
}

/**
 * 視覚的なグループ
 */
const YouTube: React.FC<YouTubeProps> = ({
  embedId,
  aspectRatio,
  title = 'YouTube video player',
  className,
}) => (
  <div className={className}>
    <iframe
      width='100%'
      src={`https://www.youtube.com/embed/${embedId}`}
      title={title}
      loading='lazy'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
      // ページの暗い配色と食い違って白い背景が付かないよう、埋め込み先の配色に揃える
      style={{ border: 'none', aspectRatio, colorScheme: 'light' }}
    />
  </div>
);
export default YouTube;
