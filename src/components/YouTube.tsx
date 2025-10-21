import React, { useEffect, useRef, useState } from 'react';

interface YouTubeProps {
  embedId: string;
  aspectRatio: number;
  className?: string;
}

/**
 * 視覚的なグループ
 */
const YouTube: React.FC<YouTubeProps> = ({ embedId, aspectRatio, className }) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [iFrameHeight, setIFrameHeight] = useState(0);

  useEffect(() => {
    if (iFrameRef.current == null) {
      return undefined;
    }
    const divElement = iFrameRef.current;

    setIFrameHeight(iFrameRef.current.getBoundingClientRect().width);

    const observer = new ResizeObserver((_) => {
      setIFrameHeight(divElement.getBoundingClientRect().width / aspectRatio);
    });
    observer.observe(divElement);

    return () => {
      observer.unobserve(divElement);
    };
  }, [iFrameRef, aspectRatio]);

  return (
    <div className={className}>
      <iframe
        ref={iFrameRef}
        width='100%'
        height={`${iFrameHeight}px`}
        src={`https://www.youtube.com/embed/${embedId}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        style={{ border: 'none' }}
      />
    </div>
  );
};
export default YouTube;
