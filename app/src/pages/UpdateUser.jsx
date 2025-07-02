import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowLeft, FaTrash, FaEllipsisV } from "react-icons/fa"
const serverUrl = import.meta.env.VITE_SERVER_URL;

const UpdateUser = () => {

  const navigate  = useNavigate()

  const [inputData, setinputData] = useState({
    name:"",
    email:"",
    url:"",
    })
  const params = useParams()
  
useEffect(() => {
   const getUserData =async ()=>{
        try{
            const res = await axios.get(`${serverUrl}/updateuser/${params.id}`)
            const data = res.data.user
            setinputData(data)
        }catch(err){
            console.log("Error Fetching User Data To Update"+err)
        }
    }
   getUserData()
}, [])

   
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");
  const [created, setcreated] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputData((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  };

  const submit = () => {
    const { name, email, url } = inputData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "" && email === "" && url === "") {
      setstatus("Enter Details");
    } else if (name === "") {
      setstatus("Enter Name");
    } else if (email === "") {
      setstatus("Enter email");
    } else if (!emailRegex.test(email)) {
      setstatus("Invalid Email");
    } else if (url === "") {
      setstatus("Enter URL");
    } else {
      setstatus("");
      setloading(true)
      updateData()
    }
  };

   const updateData = async ()=>{
      try{
         const res = await axios.put(`${serverUrl}/updateuser/${params.id}`,inputData)
          setloading(false)
         setcreated(true)
         setstatus("User Updated")
         setinputData({
            name:"",
            email:"",
            url:""
         })
         setTimeout(()=>{
            setstatus("")
            navigate('/users')
         },500)
      }catch(err){
         console.log("Error Sending Data"+err)
         setstatus("Something went wrong")
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
    className="w-full h-full bg-[#090c0c] flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl font-medium underline">EDIT DETAILS</h1>
      <motion.div className="bg-[#0f1417] rounded w-100 p-10 flex flex-col gap-5">
        <motion.input layout
          type="text"
          placeholder="Enter name"
          name="name"
          value={inputData.name}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 focus:border-[#9dc9ce] border-zinc-600 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input layout
          type="text"
          placeholder="Enter Email"
          name="email"
          value={inputData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 focus:border-[#9dc9ce] border-zinc-600 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input layout
          type="text"
          placeholder="Image url"
          name="url"
          value={inputData.url}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 focus:border-[#9dc9ce] border-zinc-600 rounded px-7 py-2 outline-0"
        ></motion.input>

        <div className="flex justify-center items-center">
           <AnimatePresence> 
          {loading && (
            <motion.div 
            initial={{
               rotate:0,
               opacity:0
            }}
            animate={{
               rotate:360,
               opacity:1
            }}
            exit={{opacity:0,
               transition:{
                  opacity:0.3
               }
            }}
            transition={{
               opacity:0.3,
               ease:'linear',
               duration:1,
               repeat:Infinity

            }}
            className="mr-5 h-5 w-5 border-2 border-transparent border-t-white border-r-white rounded-full"></motion.div>
          ) 
         }
         {status && (
            <motion.p 
         initial={{
            opacity:0
         }}
         animate={{
            opacity:1
         }}
         exit={{opacity:0}}
         transition={{
            ease:'easeIn'
         }}
         
         className={`text-center ${created ? 'text-blue-400' : 'text-red-600'}  font-medium tracking-wide`}>
              {status}
            </motion.p> 
         )}
          </AnimatePresence>
        </div>
        <button
          onClick={submit}
          className="hover:shadow-2xl text-black hover:-translate-y-1 transition-all ease hover:shadow-[#37bac9] text-sm bg-[#36bbca] px-7 py-3 rounded font-medium cursor-pointer"
        >
          UPDATE
        </button>
      </motion.div>
      <Link to='/users' className="text-[#2f777f] flex items-center gap-2"><FaArrowLeft/> Go Back</Link>
    </motion.div>
  );
};

export default UpdateUser;
