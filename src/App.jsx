import { useEffect, useState } from 'react'

import Animation from './component/Animation'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

function App() {

  const [keyEvent, setKeyEvent] = useState(null)

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      setKeyEvent(e)
    })
  },[] )

  return (
    <>
      <h1 className='text-center mt-3'>68052331 Pukao Pongpensri</h1>
      <Animation keyEvent={keyEvent} velocity = {100} />
      {/* <Animation fieldHeight={200} fieldWidth={300} ballRadius={25}/> */}
    </>
  )
}

export default App
