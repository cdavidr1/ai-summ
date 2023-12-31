import React from 'react';
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt="logo" className='w-28 object-contain' />

        <button type='button' className='black_btn'
          onClick={() => window.open('https://github.com')}>
            GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Translate with <br className='max-md:hidden' />
        <span className='green_gradient'>GPT-4</span>
      </h1>

      <h2 className='desc'>Use AI to generate a summarized translation from a url!</h2>


    </header>
  )
}

export default Hero