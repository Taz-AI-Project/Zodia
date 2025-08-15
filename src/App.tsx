import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import MusicButton from './MusicButton';

interface quoteResonse {
  quoteRecommendation: string;
}

interface zodiacResonse {
  datesAndTraits: {
    endD: string;
    startD: string;
    traists: string[];
    userZodiac: string;
    __v: number;
    _id: string;
  };
}

function App() {
  const [zodiacSign, setZodiacSign] = useState<string>('');
  const [feelingContent, setFeelingContent] = useState('');
  const [cardsArr, setCardsArr] = useState<null[]>([]);
  const [cardsInfo, setCardsInfo] = useState(' ');
  const [error, setError] = useState(''); //TO DO: update error handling on frontend
  const [flipped, setFlipped] = useState(false)
  const [personalityInfo, setPersonalityInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
    setCardsArr(Array.from({length: 4}, (_, index) => {
      <Card cardInfo={_} index={index} zodiacSign={zodiacSign} flipped={flipped} />
    }))
  }, [])

  useEffect(() => {
    const setDates = async () => {
      const response = await fetch(`/api/${zodiacSign}`)
      console.log(response)
    }
    setDates()
  }, [zodiacSign])

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userZodiac: zodiacSign,
          userQuery: feelingContent,
        }),
      });

      if (response.status !== 200) {
        const parsedError: { err: string } = await response.json();
        setError(parsedError.err);
      } else {
        setFlipped(true)
        const parsedResponse: quoteResonse = await response.json();
        setCardsInfo(parsedResponse.quoteRecommendation);
      }

      const zodiacInfo = await fetch(`/api/${zodiacSign}`, {});
      if (zodiacInfo.status !== 200) {
        const parsedError: { err: string } = await zodiacInfo.json();
        setError(parsedError.err);
      } else {
        const parsedResponse: zodiacResonse = await zodiacInfo.json();
        console.log('parsedResponse:', parsedResponse);
        setPersonalityInfo(parsedResponse.datesAndTraits);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('onSubmitHandler Error: ', error);
      setError('Error fetching recommendation');
    }
  };

  return (
    <div className='relative min-h-screen app-surface'>
      <MusicButton />
      <h1
        style={{
          fontFamily: '"Codystar", cursive',
          letterSpacing: '4px',
          // fontFamily: '"Raleway Dots", cursive',
          // letterSpacing: '8px',
          color: 'gold',
        }}
        className='text-[min(10vw,40px)] font-semibold mb-8 text-shadow-lg/30 text-champagne'
      >
        Zodia
      </h1>
      <div className='flex justify-center m-5'>
        <p className='text-champagne mr-5'>Whats your sign?</p>
        <select
          id='selectEl'
          name='selectEl'
          className='p-1 border-[champagne]'
          defaultValue='placeholder'
          onChange={(e) => setZodiacSign(e.target.value)}
        >
          <option value='placeholder' disabled>
            Choose sign
          </option>
          <option value='Aries'>♈ Aries</option>
          <option value='Taurus'>♉ Taurus</option>
          <option value='Gemini'>♊ Gemini</option>
          <option value='Cancer'>♋ Cancer</option>
          <option value='Leo'>♌ Leo</option>
          <option value='Virgo'>♍ Virgo</option>
          <option value='Libra'>♎ Libra</option>
          <option value='Scorpio'>♏ Scorpio</option>
          <option value='Sagittarius'>♐ Sagittarius</option>
          <option value='Capricorn'>♑ Capricorn</option>
          <option value='Aquarius'>♒ Aquarius</option>
          <option value='Pisces'>♓ Pisces</option>
        </select>
      </div>
      <div className='textarea-container'>
        <label htmlFor='userTextArea' className='flex justify-center'>
          <textarea
            name='userTextArea'
            id='userTextArea'
            className='bg-darkpurple field-sizing-fixed h-35 py-2 px-3 block w-80 text-champagne rounded-lg sm:text-sm inset-shadow-sm inset-shadow-pink-100/50'
            placeholder='How are you feeling today?...'
            onChange={(e) => setFeelingContent(e.target.value)}
          ></textarea>
        </label>
        <button type='submit' onClick={onSubmitHandler} className='m-1 w-18'>
          {isLoading ? 'Loading' : 'Submit'}
        </button>
      </div>

      <div id='cards' className='flex justify-center'>
        {cardsArr &&
          cardsArr.map((card, index) => (
            <Card
              cardInfo={cardsInfo}
              startDate={personalityInfo.startD}
              endDate={personalityInfo.endD}
              index={index}
              zodiacSign={zodiacSign} 
              flipped={flipped}
            />
          ))}
      </div>
      <div className='bg'></div>
      <div className='star-field'>
        <div className='layer'></div>
        <div className='layer'></div>
        <div className='layer'></div>
      </div>
      {/* {personalityInfo && (
        <div className='personality'>
          {personalityInfo.traits.map((trait, index) => (
            <p key={index}>{trait}</p>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default App;
