import React from 'react';
import Hero from './components/Hero';
import Translator from './components/Translator';
import './App.css';

const App = () => {
  return (
    <main>
        <div className='main'>
            <div className='gradient'/>
        </div>

        <div className='app'>
            <Hero />
            <Translator />
        </div>
    </main>
  )
}

export default App