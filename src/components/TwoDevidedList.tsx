import React from 'react';

type TwoDevidedListProps = {
  items: readonly [string, string][];
  className?: string;
};

const TwoDevidedList: React.FC<TwoDevidedListProps> = ({ items, className }) => {
  return (
    <table className={className ?? ''}>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TwoDevidedList;
