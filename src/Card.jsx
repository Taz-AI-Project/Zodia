import { useEffect, useState } from 'react';

const Card = ({ cardInfo, index, startDate, endDate }) => {
  const [rotation, setRotation] = useState('');
  useEffect(() => {
    const rotationSetter = () => {
      if (index === 0) {
        setRotation('rotate-3');
      } else {
        setRotation('none');
      }
    };
    rotationSetter();
  }, []);

  return (
    <div
      className={`card h-[25rem] w-[22rem] border-3 border-white rounded-md absolute top-80 bg-champagne text-darkpurple rotate-${index}`}
    >
      {index === 3 && (
        <div>
          <p>
            {startDate} - {endDate}
          </p>
          <p>{cardInfo}</p>
        </div>
      )}
    </div>
  );
};
export default Card;
