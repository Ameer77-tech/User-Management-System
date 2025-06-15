import React from 'react'

const ViewUsers = () => {
  return (
     <div className='w-full min-h-screen bg-zinc-900 p-10'>
        <a href='/' className='text-sm text-blue-600'>Back To Home</a>
        <h1 className='mt-5 text-3xl'>ALL USERS</h1>
        <div className='flex flex-wrap gap-7 mt-5'>
                <div className='flex-col flex bg-zinc-700 w-72 p-5 rounded'>
                    <div className='bg-zinc-800 w-full overflow-hidden flex items-center justify-center h-64 rounded'>
                        <img className='mx-auto' src="https://imgs.search.brave.com/EaW3MJahnvkudW-V_a0_bwrbP8YZWT4V4BvHzouKmMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci85Nzgv/Mjk1L0hELXdhbGxw/YXBlci1hdmVuZ2Vy/LWVuZC1nYW1lLW1h/cnZlbC10b255LXN0/YXJrLXJvYmVydC1k/b3duZXktanItdGh1/bWJuYWlsLmpwZw"></img>
                    </div>
                    <h3 className='font-mono font-medium text-lg mt-3'>Ameer Shaik</h3>
                    <p className='text-zinc-400'>ameer@gmail.com</p>
                    <div className='flex w-full justify-between text-sm mt-5'>
                        <a href='/updateuser' className= 'text-blue-500 cursor-pointer py-1 '> Edit Details</a>
                        <button className='text-red-600 cursor-pointer hover:bg-red-600 hover:text-white px-2 transition-all ease'>Delete User</button>
                    </div>
                </div>
                
        </div>
     </div>
  )
}

export default ViewUsers