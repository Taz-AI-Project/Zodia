import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card'
import MusicButton from './MusicButton'


function App() {
  const [zodiacSign, setZodiacSign] = useState<string>('')
  const [feelingContent, setFeelingContent] = useState('')
  const [cardsArr, setCardsArr] = useState<any>([])
  const [cardsInfo, setCardsInfo] = useState('Quote')
  const [error, setError] = useState('')


  useEffect(() => {
    setCardsArr(Array.from({length: 4}, (_, index) => {
      <Card cardInfo={_} index={index} />
    }))
  }, [])

  const onSubmitHandler = async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userZodiac: zodiacSign, userQuery: feelingContent })
      })

      if (response.status !== 200) {
        const parsedError: { err: string } = await response.json();
        setError(parsedError.err);
      } else {
        const parsedResponse: any = await response.json();
        setCardsInfo(parsedResponse.quoteRecommendation);
      }

    } catch (error) {
      console.error('onSubmitHandler Error: ', error)
      setError('Error fetching recommendation');
    }
  }

  return (
    <div className="relative min-h-screen">
      <MusicButton />
      <h1 className='text-red-500'>Zodiac project</h1>
      <div>
        <p className='text-white'>Whats your sign?</p>
        <select onChange={(e) => setZodiacSign(e.target.value)}>
          <option value="Aries">♈ Aries</option>
          <option value="Taurus">♉ Taurus</option>
          <option value="Gemini">♊ Gemini</option>
          <option value="Cancer">♋ Cancer</option>
          <option value="Leo">♌ Leo</option>
          <option value="Virgo">♍ Virgo</option>
          <option value="Libra">♎ Libra</option>
          <option value="Scorpio">♏ Scorpio</option>
          <option value="Sagittarius">♐ Sagittarius</option>
          <option value="Capricorn">♑ Capricorn</option>
          <option value="Aquarius">♒ Aquarius</option>
          <option value="Pisces">♓ Pisces</option>
        </select>
      </div>
      <div>
        <p className='text-white'>How are you feeling?</p>
        <input type="text" name="" id="" onChange={(e) => setFeelingContent(e.target.value)} />
      </div>
      <button type="submit" onClick={onSubmitHandler} className='border border-2 border-white text-white m-4 p-1 w-24'>Submit</button>
      <div id="cards" className='flex justify-center'>
        {
          cardsArr && cardsArr.map((card, index) => <Card cardInfo={cardsInfo} index={index} />)
        }
      </div>
    </div>
  )
}

export default App
