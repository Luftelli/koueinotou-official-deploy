import React from 'react';

interface TwoDevidedListProps {
  items: readonly [string, string][];
  className?: string;
}

const TwoDevidedList: React.FC<TwoDevidedListProps> = ({ items, className }) => (
  <table className={className ?? ''}>
    <tbody>
      {items.map((item) => (
        <tr key={item[0] + item[1]}>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default TwoDevidedList;
