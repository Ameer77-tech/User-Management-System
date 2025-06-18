import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const User = (props) => {
    const navigate = useNavigate()
    

    const deleteUser =async (id)=>{
        try{
            const response = await axios.delete(`http://localhost:3000/deleteuser/${id}`)
            
            
        }catch(err){
            console.log("Cannot Delete User"+err)
        }finally{
            props.func()
        }
    }


  return (
     <div className='flex-col flex bg-zinc-700 w-72 p-5 rounded'>
                    <div className='bg-zinc-800 w-full overflow-hidden flex items-center  h-64 rounded'>
                        <img className='mx-auto object-cover object-top h-full w-full' src={props.url} alt='image'></img>
                    </div>
                    <h3 className='font-mono font-medium text-lg mt-3 '>{props.name}</h3>
                    <p className='text-zinc-400'>{props.email}</p>
                    <div className='flex w-full justify-between text-sm mt-5'>
                        <Link to={`/updateuser/${props.id}`} 
                      
                        className= 'text-blue-500 cursor-pointer py-1 '>Edit Details</Link>
                        <button 
                        onClick={()=>{
                            deleteUser(props.id)
                        }}
                        className='text-red-600 cursor-pointer hover:bg-red-600 hover:text-white px-2 transition-all ease'>Delete User</button>
                    </div>
      </div>
  )
}

export default User