import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [flippedCards, setFlippedCards] = useState([])
  const [cards, setCards] = useState([])

  //double and shuffle card's image paths
  useEffect(() => {
    let allCards = [
      { url: './capybara.jpg', paired: false },
      { url: './horse.jpeg', paired: false },
      { url: './panda.jpg', paired: false },
      { url: './sloth.webp', paired: false },
      { url: './tiger.jpg', paired: false },
      { url: './toucan.jpg', paired: false },
      { url: './turtle.jpg', paired: false },
      { url: './zebra.jpg', paired: false }
    ]
    allCards = [...allCards, ...allCards]
    shuffle(allCards)
    setCards(allCards)
  }, [])

  function handleFlip(key) {
    if (!flippedCards.some(card => card.index === key) && flippedCards.length < 2) {
      setFlippedCards(prev => [...prev, { index: key, path: cards[key].url }])
    }
  }

  useEffect(() => {
    if (flippedCards.length > 0 && flippedCards.length % 2 === 0) {
      if (flippedCards[flippedCards.length - 1].path === flippedCards[flippedCards.length - 2].path) {
        setCards(prev => {
          const newCards = [...prev]
          newCards[flippedCards[flippedCards.length - 1].index].paired = true
          newCards[flippedCards[flippedCards.length - 2].index].paired = true
          return newCards
        })
      }

      setTimeout(() => {
        setFlippedCards([])
      }, 1000)
    }
  }, [flippedCards])

  if (cards.every(card => card.paired)) {
    return <div>Terminou</div>
  }

  return (
    <div id="board">
      {
        cards.map((card, i) => {
          const isFlipped = flippedCards.some(flippedCard => flippedCard.index === i) || card.paired

          return (
            <div
              key={i}
              className={`card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(i)}
            >
              <div className="card-flip">
                <div className="card-front">memorize</div>
                <div
                  className="card-back"
                  style={{ backgroundImage: isFlipped ? `url(${card.url})` : '' }}
                ></div>
              </div>
            </div>
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