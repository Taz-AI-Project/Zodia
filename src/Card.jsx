import { useEffect, useState } from 'react';

const Card = ({ cardInfo, index, startDate, endDate, flipped, zodiacSign }) => {
  const [rotation, setRotation] = useState('');
  useEffect(() => {
    const rotationSetter = () => {
      if (index === 0) {
        setRotation('rotate-5');
      } else {
        setRotation('none');
      }
    };
    rotationSetter();
  }, []);

  return (
    <div
      className={`card h-[25rem] w-[16rem] rounded-md absolute top-80 ${
        flipped && index === 3 ? 'flipped' : ''
      }`}
    >
      <div className='card-inner w-full h-full'>
        <div
          className={`${
            flipped ? 'card-back' : 'card-front'
          } w-full h-full flex items-center justify-center rounded-md text-champagne`}
          style={{
            backgroundImage: `url('../assets/${
              flipped ? 'blank' : zodiacSign
            }.png')`,
          }}
        >
          {flipped && index === 3 ? (
            <div>
              <p className='font-bold'>
                {startDate} - {endDate}
              </p>
              <p>{cardInfo}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Card;
