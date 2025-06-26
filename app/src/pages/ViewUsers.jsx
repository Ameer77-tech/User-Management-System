import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import User from '../components/User'
import axios from 'axios'



const ViewUsers = () => {
   const [Users, setUsers] = useState([])
   const [status, setstatus] = useState("No Users")
   const [func, setfunc] = useState(null)
   
    const getData =async ()=>{
          try{
            const res = await axios.get(`http://localhost:3000/users`)
            const {users} = res.data
            setUsers([...users].reverse())
            
            
         }catch(err){
            console.log("Error reading Users"+err)
         }
      }
      useEffect( () => {
        getData()
        
   }, [])

   const deleteAll =async ()=>{
      try{
         const res = await axios.delete(`http://localhost:3000/deleteallusers`)
         console.log(res.data)
         if(res.data.deletedCount ===0){
            return
         }
      }catch(err){
         console.log("Error deleting All users"+err)
      }
      finally{
          getData()
      }
   }

  return (
     <div className='w-full min-h-screen bg-zinc-900 p-10'>
      <div className='flex gap-5'> 
           <Link to='/' className='text-sm text-blue-600'>Back To Home</Link>
           <p className='text-sm text-red-600 relative cursor-pointer'
           onClick={deleteAll}
           >Delete All Users</p>
      </div>
       
        <h1 className='mt-5 text-3xl'>ALL USERS</h1>
        <div className='flex flex-wrap gap-7 mt-5'>
         { Users.length < 1 ? <p className='text-gray-500'>{status}</p> :
            Users.map((user,idx)=>{
               return (
                  <User key={idx} name={user.name} email={user.email} url={user.url} id={user._id} func={getData}/>
               )
            })
         }
              
                
        </div>
     </div>
  )
}

export default ViewUsers