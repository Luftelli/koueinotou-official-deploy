import React, { useEffect, useRef, useState } from 'react';

interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: readonly SectionNavItem[];
}

/**
 * ゲーム内HUDの塔の列に見立てたページ内目次
 * 読み進めたセクションの塔が埋まっていく
 */
const SectionNav: React.FC<SectionNavProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            setActiveIndex(items.findIndex(({ id }) => id === entry.target.id));
          });
      },
      // 画面上部のこの帯に入ったセクションを現在地とする
      { rootMargin: '-30% 0px -60% 0px' },
    );
    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element != null) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [items]);

  // 横スクロールする幅では、現在地が見える位置まで目次を動かす
  useEffect(() => {
    const list = listRef.current;
    const activeItem = list?.children[activeIndex];
    if (list == null || !(activeItem instanceof HTMLElement)) {
      return;
    }
    list.scrollLeft = activeItem.offsetLeft - (list.clientWidth - activeItem.offsetWidth) / 2;
  }, [activeIndex]);

  return (
    <nav
      aria-label='ページ内目次'
      className='sticky top-[60px] z-40 w-full border-b border-rule bg-black'
    >
      <ul
        ref={listRef}
        className='scrollbar-none relative mx-auto flex overscroll-x-contain max-w-[1600px] gap-5 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-10 xl:justify-between xl:px-16 2xl:px-20'
      >
        {items.map(({ id, label }, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={id} className='flex-none'>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`flex items-center gap-1.5 text-sm font-bold decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-white hover:underline ${
                  isActive ? 'text-white underline' : 'text-ink-dim'
                }`}
              >
                <svg viewBox='0 0 12 16' aria-hidden='true' className='h-4 w-3 flex-none'>
                  <path
                    d='M6 1 11 15H1Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    fill={index <= activeIndex ? 'currentColor' : 'none'}
                  />
                </svg>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default SectionNav;
