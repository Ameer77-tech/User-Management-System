import React, { useState } from 'react'

const CreateUser = () => {
    const [userData, setuserData] = useState({
        name:"",
        email:"",
        url:""
    })
  return (
     <div className='w-full h-full bg-zinc-900 flex flex-col justify-center items-center gap-5'>
        <h1 className='text-4xl underline'>Create a user</h1>
        <div className='bg-zinc-800 rounded w-100 p-10 flex flex-col gap-5'>
            <input type="text" placeholder='Enter name' 
            className='border-2 border-zinc-400 rounded px-7 py-2 outline-0'
            ></input>
             <input type="text" placeholder='Enter Email' 
            className='border-2 border-zinc-400 rounded px-7 py-2 outline-0'
            ></input>
             <input type="text" placeholder='Image url' 
            className='border-2 border-zinc-400 rounded px-7 py-2 outline-0'
            ></input>
           <button className='text-sm bg-blue-600 px-7 py-3 rounded font-medium cursor-pointer hover:bg-blue-700'>CREATE</button> 
        </div>
     </div>
  )
}

export default CreateUser