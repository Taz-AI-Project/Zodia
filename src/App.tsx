import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

interface quoteResonse {
  quoteRecommendation: string;
}

function App() {
  const [zodiacSign, setZodiacSign] = useState<string>('');
  const [feelingContent, setFeelingContent] = useState('');
  const [cardsArr, setCardsArr] = useState<null[]>([]);
  const [cardsInfo, setCardsInfo] = useState('Quote');
  // const [error, setError] = useState(''); //TO DO: update error handling on frontend

  useEffect(() => {
    setCardsArr(
      Array.from({ length: 4 }, (_, index) => {
        return <Card cardInfo={_} index={index} />;
      })
    );
  }, []);

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
        const parsedResponse: quoteResonse = await response.json();
        setCardsInfo(parsedResponse.quoteRecommendation);
      }
    } catch (error) {
      console.error('onSubmitHandler Error: ', error);
      setError('Error fetching recommendation');
    }
  };

  return (
    <div>
      <h1 className='text-red-500'>Zodiac project</h1>
      <div className='flex justify-center m-5'>
        <p className='text-champagne mr-5'>Whats your sign?</p>
        <select className='' onChange={(e) => setZodiacSign(e.target.value)}>
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
      <button
        type='submit'
        onClick={onSubmitHandler}
        className='bg-finn cursor-pointer text-champagne shadow-lg hover:shadow-[0_0px_35px_rgba(227,171,206,0.7)] transition-shadow duration-300 m-4 p-1 w-24'
      >
        Talk To Me
      </button>
      <div id='cards' className='flex justify-center'>
        {cardsArr &&
          cardsArr.map((card, index) => (
            <Card cardInfo={cardsInfo} index={index} />
          ))}
      </div>
    </div>
  );
}

export default App;
