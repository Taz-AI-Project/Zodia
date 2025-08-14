import { useEffect, useState } from 'react'
import './App.css'
import { cards } from './mockData'
import Card from './Card'

function App() {
  const [zodiacSign, setZodiacSign] = useState('')
  const [feelingContent, setFeelingContent] = useState('')
  const [cardsInfo, setCardsInfo] = useState<string[]>([])

  useEffect(() => {
    setCardsInfo([...cards])
  }, [])

  const onSubmitHandler = async () => {
    try {
      const response = fetch('/api', {
        method: 'POST',
        headers: { 'ContentType': 'application/json' },
        body: JSON.stringify({ zodiacSign, feelingContent })
      })
    } catch (error) {
      console.error('onSubmitHandler Error: ', error)
    }
  }

  return (
    <div>
      <h1 className='text-red-500'>Zodiac project</h1>
      <div>
        <p>Whats your sign?</p>
        <input type="text" name="" id="" onChange={(e) => setZodiacSign(e.target.value)} />
      </div>
      <div>
        <p>How are you feeling?</p>
        <input type="text" name="" id="" onChange={(e) => setFeelingContent(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
      <div id="cards" className='flex justify-center'>
        {
          cardsInfo.map((card, index) => <Card cardInfo={card} index={index} />)
        }
      </div>
    </div>
  )
}

export default App
