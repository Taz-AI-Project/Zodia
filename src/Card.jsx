import { useEffect, useState } from 'react';

const Card = ({ cardInfo, index }) => {
  const [zIndex, setZIndex] = useState('');
  useEffect(() => {
    const zIndexSetter = () => {
      if (index === 0) {
        setZIndex('rotate-3');
      } else {
        setZIndex('none');
      }
    };
    zIndexSetter();
  }, []);

  return (
    <div
      className={`h-[25rem] w-[22rem] border-2 rounded-md absolute top-80 ${zIndex} bg-champagne border-champagne text-darkpurple`}
    >
      {index === 3 ? cardInfo : null}
    </div>
  );
};
export default Card;
