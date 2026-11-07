import React from 'react';

interface TwoDevidedListProps {
  items: readonly [string, string][];
  className?: string;
}

const TwoDevidedList: React.FC<TwoDevidedListProps> = ({ items, className }) => (
  <dl className={`divide-y divide-rule tabular-nums ${className ?? ''}`}>
    {items.map((item) => (
      <div
        key={item[0] + item[1]}
        className='grid grid-cols-1 gap-x-6 py-2.5 sm:grid-cols-[11rem_1fr]'
      >
        <dt className='text-ink-dim'>{item[0]}</dt>
        <dd className='font-bold'>{item[1]}</dd>
      </div>
    ))}
  </dl>
);
export default TwoDevidedList;
