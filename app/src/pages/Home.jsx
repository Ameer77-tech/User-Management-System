import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='md:w-full md:h-full md:bg-zinc-900 md:flex md:flex-col md:justify-center md:items-center md:gap-5 justify-center items-center w-full h-full flex flex-col gap-5'>
        <h1 className='md:text-5xl text-4xl font-medium font-mono'>Welcome, friend</h1>
        <h3 className='md:text-xl text-sm text-blue-600 font-mono'>Let's get Started by creating a New User</h3>
       <Link to='/create'><button className='md:text-sm mt-5 rounded bg-blue-600 px-5 py-3 font-medium cursor-pointer hover:bg-blue-700'>Click Here To Get Started!</button></Link>
    </div>
  )
}

export default Home