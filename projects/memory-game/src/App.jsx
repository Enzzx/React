import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [flippedCards, setFlippedCards] = useState([])
  const [cards, setCards] = useState([])

  //double and shuffle card's image paths
  useEffect(() => {
    let allCards = ['./capybara.jpg', './horse.jpeg', './panda.jpg', './sloth.webp', './tiger.jpg', './toucan.jpg', './turtle.jpg', './zebra.jpg']
    allCards = [...allCards, ...allCards]
    shuffle(allCards)
    setCards(allCards)
  }, [])

  
  function handleFlip(key) {
    if (!flippedCards.some(card => card.index === key)) {
      setFlippedCards(prev => [...prev, {index: key, path: cards[key]}])
    }
  }

  /* useEffect(() => {
    if (flippedCards.length > 0 && flippedCards.length % 2 === 0) {
      if (flippedCards[flippedCards.length-1].path === flippedCards[flippedCards.length-2].path) {
        console.log('par')
      } else {
        setTimeout(() => {
          setFlippedCards(prev => prev.slice(0, -2))
        }, 1000)
      }
    }
  }, [flippedCards, cards]) */

  return (
    <div id="board">
      {
        cards.map((card, i) => {
          const isFlipped = flippedCards.some(card => card.index === i)

          return (
            <div
              key={i}
              className={`card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(i)}
              style={{backgroundImage: isFlipped ? `url(${card})` : ''}}
            />
          )
        })
      } 
    </div>
  )
}

export default App


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}