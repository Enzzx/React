import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTime = useRef(0)
  const intervalRef = useRef(null)


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime.current)
      }, 10)
    }

    return () => {clearInterval(intervalRef.current)} 

  }, [isRunning])

  function stopStart() {
    if (!isRunning) {
      startTime.current = Date.now() - elapsedTime
      console.log(startTime.current)
    }

    setIsRunning(!isRunning)
  }

  function reset() {
    setIsRunning(false)
    setElapsedTime(0)
  }

  function formatTime() {
    const min = Math.floor(elapsedTime / (1000 * 60) % 60)
    const sec = Math.floor(elapsedTime / 1000 % 60)
    const dec = Math.floor((elapsedTime % 1000) / 10)

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}:${String(dec).padStart(2, "0")}`
  }

  return (
    <div className='stopwatch'>
      <p className='timer'>{formatTime()}</p>
      <section>
        <button onClick={stopStart} className='run-btn'>{isRunning ? 'stop' : 'start'}</button>
        {
          elapsedTime != 0 ? <button onClick={reset} className='reset-btn'>reset</button> : console.log("nada a mostrar")
        }
      </section>
    </div>
  )
}

export default App