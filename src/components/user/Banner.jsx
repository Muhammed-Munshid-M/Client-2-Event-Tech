import React from 'react'

function Banner() {
  return (
    <div className='relative'>
      <img className='h-[25rem] object-cover w-full' src="/pexels-kseniia.jpg" alt="This image not working" />
      <h1 className='absolute text-fuchsia-700 text-center font-serif font-semibold text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Give your plans, Our ready to help you</h1>
    </div>
  )
}

export default Banner
