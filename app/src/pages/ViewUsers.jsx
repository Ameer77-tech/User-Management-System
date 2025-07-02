import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import User from '../components/User'
import axios from 'axios'
import { AnimatePresence, motion } from "motion/react";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { FaUser,  FaArrowLeft, FaTrash, FaEllipsisV } from "react-icons/fa";



const ViewUsers = () => {
   const [Users, setUsers] = useState([])
   const [status, setstatus] = useState("No Users")
   const [func, setfunc] = useState(null)
   
    const getData =async ()=>{
          try{
            const res = await axios.get(`${serverUrl}/users`)
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
         const res = await axios.delete(`${serverUrl}/deleteallusers`)
         if(res.data.deletedCount ===0){
            alert("No users to delete");
         }
      }catch(err){
         console.log("Error deleting All users"+err)
      }
      finally{
          getData()
      }
   }

  return (
     <motion.div 
     initial={{
      opacity:0,
      y:20
     }}
     animate={{opacity:1,y:0}}
     transition={{duration:0.4}}
     exit={{opacity:0,y:-20}}
     className='w-full min-h-screen bg-zinc-900 p-10'>
      <div className='flex gap-5'> 
           <Link to='/' className='text-sm text-blue-600 flex gap-2 justify-center items-center'><FaArrowLeft/> Back To Home</Link>
           <button className='flex items-center gap-2 text-sm text-red-600 relative cursor-pointer'
           onClick={()=>{
           let ok =  confirm("Are You Sure?")
           if(ok){
            deleteAll()
           }
           else{
            return;
           }
           }}
           ><FaTrash/> Delete All Users</button>
      </div>
       
        <h1 className='mt-5 text-3xl'>ALL USERS</h1>
        <div className='grid md:grid-cols-5 gap-10 mt-5 sm:grid-cols-2' >
         <AnimatePresence>

         
         { Users.length < 1 ?<motion.p 
         initial={{
            opacity:0
         }}
         animate={{
            opacity:1
         }}
         transition={{
            duration:0.001,
            delay:0.4
         }}
         className='text-gray-500'>{status}</motion.p> :
            Users.map((user,idx)=>{
               return (
                  <User key={user._id} name={user.name} email={user.email} url={user.url} id={user._id} func={getData} index={idx}/>
               )
            })
         }
         </AnimatePresence>
              
                
        </div>
     </motion.div>
  )
}

export default ViewUsers