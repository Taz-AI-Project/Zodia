import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import MusicButton from './MusicButton';

interface quoteResonse {
  quoteRecommendation: string;
}

function App() {
  const [zodiacSign, setZodiacSign] = useState<string>('');
  const [feelingContent, setFeelingContent] = useState('');
  const [cardsArr, setCardsArr] = useState<null[]>([]);
  const [cardsInfo, setCardsInfo] = useState(' ');
  const [error, setError] = useState(''); //TO DO: update error handling on frontend
  const [flipped, setFlipped] = useState(false)
  const [personalityInfo, setPersonalityInfo] = useState({});
    
  useEffect(() => {
    setCardsArr(Array.from({length: 4}, (_, index) => {
      <Card cardInfo={_} index={index} zodiacSign={zodiacSign} flipped={flipped} />
    }))
  }, [])

  useEffect(() => {
    setCardsArr(
      Array.from({ length: 4 }, (_, index) => {
        return <Card cardInfo={_} index={index} />;
      })
    );
  }, []);

  useEffect(() => {
    const setDates = async () => {
      const response = await fetch(`/api/${zodiacSign}`)
      console.log(response)
    }
    setDates()
  }, [zodiacSign])

  const onSubmitHandler = async () => {
    try {
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
        const parsedResponse: quoteResonse = await zodiacInfo.json();
        console.log('parsedResponse:', parsedResponse);
        setPersonalityInfo(parsedResponse.datesAndTraits);
      }

    } catch (error) {
      console.error('onSubmitHandler Error: ', error);
      setError('Error fetching recommendation');
    }
  };

  return (
    <div className='relative min-h-screen'>
      <MusicButton />
      <h1 className='text-[min(10vw,40px)] font-semibold mb-8 text-white text-shadow-lg/30'>
        Zodiac project
      </h1>
      <div className='flex justify-center m-5'>
        <p className='text-champagne mr-5'>Whats your sign?</p>
        <select className='' onChange={(e) => setZodiacSign(e.target.value)}>
          <option value='' disabled selected>
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
      <div>
        <label htmlFor='userTextArea' className='flex justify-center'>
          <textarea
            name='userTextArea'
            id='userTextArea'
            className='bg-darkpurple field-sizing-fixed h-24 py-2 px-3 block w-80 text-champagne border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 inset-shadow-sm inset-shadow-pink-100/50'
            placeholder='How are you feeling today?...'
            onChange={(e) => setFeelingContent(e.target.value)}
          ></textarea>
        </label>
      </div>

      <button type="submit" onClick={onSubmitHandler} className='border border-2 border-white text-white m-4 p-1 w-24'>Submit</button>
      <div id="cards" className='flex justify-center'>
        {
          cardsArr && cardsArr.map((card, index) => <Card cardInfo={cardsInfo} index={index} zodiacSign={zodiacSign} flipped={flipped} />)
        }

      <div className='star-field'>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
      </div>
    </div>
  );
}

export default App;
