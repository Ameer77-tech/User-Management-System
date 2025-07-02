import React from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from "motion/react";

const Home = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
    className='md:w-full md:h-full bg-[#0c1318] md:flex md:flex-col md:justify-center md:items-center md:gap-5 justify-center items-center w-full h-full flex flex-col gap-5'>
        <h1 className='md:text-5xl text-4xl font-bold font-arial tracking-wide'>Welcome,<span className='from-[#9dc9ce] bg-clip-text text-transparent bg-gradient-to-r via-[#2f777f] via-10% to-[#37bac9]'> Friend </span></h1>
        <h3 className='md:text-lg text-sm text-[#2f777f] font-arial'>Let's get Started by creating a New User</h3>
       <Link to='/create'><button className='md:text-sm mt-5 rounded bg-[#37bac9] text-black px-5 py-3 font-medium cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all ease hover:shadow-[#37bac9]'>Click Here To Get Started!</button></Link>
    </motion.div>
  )
}

export default Home