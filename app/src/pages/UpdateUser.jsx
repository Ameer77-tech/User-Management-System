import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateUser = () => {

  const navigate  = useNavigate()

  const [inputData, setinputData] = useState({
    name:"",
    email:"",
    url:"",
    })
  const params = useParams()
  console.log(params.id)
useEffect(() => {
   const getUserData =async ()=>{
        try{
            const res = await axios.get(`http://localhost:3000/updateuser/${params.id}`)
            const data = res.data.user
            console.log(data)
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
    console.log(e.target);
  };

  const submit = () => {
    const { name, email, url } = inputData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(name);
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
         const res = await axios.put(`http://localhost:3000/updateuser/${params.id}`,inputData)
         console.log(res)
      }catch(err){
         console.log("Error Sending Data"+err)
      }finally{
     setTimeout(() => {
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
         },1000)

     }, 1000);
     }
   }

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl underline">EDIT DETAILS</h1>
      <motion.div className="bg-zinc-800 rounded w-100 p-10 flex flex-col gap-5">
        <motion.input layout
          type="text"
          placeholder="Enter name"
          name="name"
          value={inputData.name}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 border-zinc-400 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input layout
          type="text"
          placeholder="Enter Email"
          name="email"
          value={inputData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 border-zinc-400 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input layout
          type="text"
          placeholder="Image url"
          name="url"
          value={inputData.url}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 border-zinc-400 rounded px-7 py-2 outline-0"
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
            className="h-5 w-5 border-2 border-transparent border-t-white border-r-white rounded-full"></motion.div>
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
          className="text-sm bg-blue-600 px-7 py-3 rounded font-medium cursor-pointer hover:bg-blue-700"
        >
          UPDATE
        </button>
      </motion.div>
      <Link to='/users' className="text-blue-600">Go Back</Link>
    </div>
  );
};

export default UpdateUser;
