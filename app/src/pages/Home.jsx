import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full bg-zinc-900 flex flex-col justify-center items-center gap-5'>
        <h1 className='text-5xl font-medium font-mono'>Welcome, friend</h1>
        <h3 className='text-xl text-blue-600 font-mono'>Let's get Started by creating a New User</h3>
       <a href='/create'><button className='text-sm mt-5 rounded bg-blue-600 px-5 py-3 font-medium cursor-pointer hover:bg-blue-700'>Click Here To Get Started!</button></a>
    </div>
  )
}

export default Home