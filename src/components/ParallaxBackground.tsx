import React, { useEffect, useState } from 'react';
import BackgroundImage from '../images/background.webp';

const scrollScale = 0.1;

/**
 * 高さが足りないときにこのスケールの分だけ画面高さより余裕を持った高さに画像サイズを変更する
 * 画面サイズぴったりの高さに画像サイズを変更するとスクロールできないため
 */
const heightToleranceScale = 2;

type ImageSize = {
  width: number;
  height: number;
};

/**
 * ページ全体に対してどれくらいの割合スクロールされているか取得する
 * @returns スクロール率
 */
function getScrollRate() {
  const scroll = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const viweHeight = document.documentElement.clientHeight;
  const scrollHeight = documentHeight - viweHeight;
  return scroll / scrollHeight;
}

/**
 * スクロール分も考慮した背景画像に必要なサイズを取得する
 * @returns 必要サイズ
 */
function getRequiredBackGroundSizeSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight * heightToleranceScale,
  };
}

/**
 * 画面サイズに適応した画像サイズを首位得する
 * @param imageSize 元の画像サイズ
 * @returns 適応後サイズ
 */
function calculateAdaptedImageSize(imageSize: ImageSize | undefined) {
  if (imageSize == null) {
    return undefined;
  }

  const requiredSize = getRequiredBackGroundSizeSize();
  const requiredAspectRatio = requiredSize.width / requiredSize.height;
  const imageAspectRatio = imageSize.width / imageSize.height;

  if (requiredAspectRatio < imageAspectRatio) {
    // 高さが足りない
    return {
      width: imageSize.width * (requiredSize.height / imageSize.height),
      height: requiredSize.height,
    };
  }
  // 幅が足りない
  return {
    width: requiredSize.width,
    height: imageSize.height * (requiredSize.width / imageSize.width),
  };
}

/**
 * 遅い速度でスクロールする背景
 */
const ParallaxBackground: React.FC = () => {
  const [scrollRate, setScrollRate] = useState(0);
  const [imageSize, setImageSize] = useState<ImageSize>();

  // 背景画像サイズ取得。初回のみ実行
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageSize({ width: image.width, height: image.height });
    };
    image.src = BackgroundImage;
  }, []);

  function onScroll(): void {
    setScrollRate(getScrollRate());
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return (): void => document.removeEventListener('scroll', onScroll);
  }, [setScrollRate]);

  const adaptedImageSize = calculateAdaptedImageSize(imageSize);

  return (
    <div
      className='fixed -z-50 bg-black'
      style={{
        top: `-${
          adaptedImageSize == null
            ? 0
            : scrollRate * (adaptedImageSize.height - window.innerHeight) * scrollScale
        }px`,
      }}
    >
      {adaptedImageSize == null ? (
        <div className='w-screen h-screen bg-black' />
      ) : (
        // 画像サイズ取得時に画像をロードするのでStaticImageを使うメリットがないため、通常のimgタグを使用する
        <img
          src={BackgroundImage}
          alt='Background'
          className='object-cover'
          style={{
            width: adaptedImageSize.width,
            height: adaptedImageSize.height,
          }}
        />
      )}
    </div>
  );
};
export default ParallaxBackground;
