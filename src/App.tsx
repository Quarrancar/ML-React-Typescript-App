import { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col max-w-[800px] mx-auto w-full'>
        <section className='min-h-screen flex flex-col'>
          <Header />
          <Homepage />

        </section>

        <footer>

        </footer>

      </div>
    </>
  )
}

export default App
