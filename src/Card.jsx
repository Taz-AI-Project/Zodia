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
      className={`card h-[25rem] w-[16rem] border-3 border-champagne rounded-md absolute top-80 ${
        flipped && index === 3 ? 'flipped' : ''
      }`}
    >
      <div className='card-inner w-full h-full'>
        {/* Front Side */}
        <div
          className='card-front w-full h-full flex items-center justify-center rounded-md text-white'
          style={{
            backgroundImage: `url('../assets/${zodiacSign}.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {flipped && index === 3 && (
            <div>
              <p>
                {startDate} - {endDate}
              </p>
              <p>{cardInfo}</p>
            </div>
          )}
        </div>

        {/* Back Side */}
        <div
          className='card-back w-full h-full flex items-center justify-center rounded-md text-white'
          style={{
            backgroundImage: `url('../assets/blank.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {index === 3 ? cardInfo : null}
        </div>
      </div>
    </div>
  );
};
export default Card;
