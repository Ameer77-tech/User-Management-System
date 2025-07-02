import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, delay, motion } from "motion/react";
const serverUrl = import.meta.env.VITE_SERVER_URL;

const User = (props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)

  const deleteUser = async (id) => {
    setloading(true)
    try {
      const response = await axios.delete(`${serverUrl}/deleteuser/${id}`);

    } catch (err) {
      console.log("Cannot Delete User" + err);
    } finally {
      props.func();
      setTimeout(()=>{
        setloading(false)
      },500)
      
    }
  };

  return (
    <motion.div
      layout
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      initial={{
        opacity: 0,
        x: -20,
      }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 90,
        delay: props.index * 0.01,
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
        },
      }}
      className="flex-col flex bg-[#0f1417] border-1 border-[#2f777f] w-72 p-5 rounded"
    >
      <div className="w-full overflow-hidden flex items-center h-64 rounded">
        <img
          className="mx-auto object-cover object-top h-full w-full"
          src={props.url}
          alt="image"
        ></img>
      </div>
      <h3 className="font-mono font-medium text-lg mt-3 ">{props.name}</h3>
      <p className="text-zinc-400">{props.email}</p>
      <div className="flex w-full justify-between text-sm mt-5">
        <Link
          to={`/updateuser/${props.id}`}
          className="text-blue-500 cursor-pointer py-1 "
        >
          Edit Details
        </Link>
        <div className="flex relative bg-red-900 hover:bg-red-600 px-2 transition-all ease">
        <button
          onClick={() => {
            deleteUser(props.id);
          }}
          className="text-red-600 cursor-pointer  hover:text-white px-2 transition-all ease"
        >
         { loading ? 
         <motion.div
                        initial={{
                          rotate: 0,
                          opacity: 0,
                        }}
                        animate={{
                          rotate: 360,
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            opacity: 0.3,
                          },
                        }}
                        transition={{
                          opacity: 0.3,
                          ease: "linear",
                          duration: 1,
                          repeat: Infinity,
                        }}
                        className="h-5 w-5 border-2 border-transparent border-t-white border-r-white rounded-full"
                      ></motion.div>: 
         "Delete User" }
        </button>
        
        </div>
      </div>
    </motion.div>
  );
};

export default User;
