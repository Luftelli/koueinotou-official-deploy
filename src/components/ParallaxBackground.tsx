import { StaticImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';

const scrollScale = 0.1;

function getScrollRate() {
  var scroll = window.scrollY;
  var documentHeight = document.documentElement.scrollHeight;
  var viweHeight = document.documentElement.clientHeight;
  var scrollHeight = documentHeight - viweHeight;
  return scroll / scrollHeight;
}

const ParallaxBackground: React.FC = () => {
  const [scrollRate, setScrollRate] = useState(0);

  function onScroll(): void {
    setScrollRate(getScrollRate());
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return (): void => document.removeEventListener('scroll', onScroll);
  }, [setScrollRate]);

  return (
    <div
      className='fixed -z-50'
      style={{
        top: `-${scrollRate * 100 * scrollScale}%`,
      }}
    >
      <StaticImage src='../images/starsky.jpg' alt='Background' />
    </div>
  );
};
export default ParallaxBackground;
