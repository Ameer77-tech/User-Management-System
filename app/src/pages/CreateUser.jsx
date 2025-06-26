import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from 'axios'
import { Link } from "react-router-dom";

const CreateUser = () => {
   
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    url: "",
  });
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");
  const [created, setcreated] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
  };

  const submit = () => {
    const { name, email, url } = userData;
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
    } 
    else if(/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url)){
      console.log("False url")
      setstatus("Invalid Url")
    }
    else {
      setstatus("");
      setloading(true)
      sendData()
    }
  };

const sendData = async () => {
  try {
    var res = await axios.post(`http://localhost:3000/create`, userData)
    setloading(false)
    setcreated(true)
    setstatus("User Created")
    setuserData({
      name: "",
      email: "",
      url: ""
    })
    setTimeout(() => {
      setstatus("")
      setcreated(false)
    }, 1000)
  } catch (err) {
    setloading(false)
    setstatus("Something went wrong")
    console.log("Error Sending Data" + res)
    return
  }
}

 
  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl underline">Create a user</h1>
      <motion.div className="bg-zinc-800 rounded w-100 p-10 flex flex-col gap-5">
        <motion.input layout
          type="text"
          placeholder="Enter name"
          name="name"
          value={userData.name}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 border-zinc-400 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input layout
          type="text"
          placeholder="Enter Email"
          name="email"
          value={userData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 border-zinc-400 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input layout
          type="text"
          placeholder="Image url"
          name="url"
          value={userData.url}
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
          CREATE
        </button>
      </motion.div>
      <Link to='/users' className="text-blue-600">View Users</Link>
    </div>
  );
};

export default CreateUser;
