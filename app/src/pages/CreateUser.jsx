import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { Link } from "react-router-dom";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { FaEye } from "react-icons/fa";

const CreateUser = () => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    url: "",
  });
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");
  const [created, setcreated] = useState(false);
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
    } else if (!checkImage(url)) {
      setstatus("Invalid Url");
    } else {
      setstatus("");
      setloading(true);
      sendData();
    }
  };

  const sendData = async () => {
    try {
      const res = await axios.post(`${serverUrl}/create`, userData);
      setloading(false);
      setcreated(true);
      setstatus("User Created");
      setuserData({
        name: "",
        email: "",
        url: "",
      });
      setTimeout(() => {
        setstatus("");
        setcreated(false);
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setstatus(err.response.data.msg);
        setloading(false); // Show limiter message
      } else {
        setstatus("Something went wrong");
        setloading(false);
        console.log("Error Sending Data" + err);
        return;
      }
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      exit={{
        y: -20,
        opacity: 0,
      }}
      className="w-full h-full bg-[#090c0c] flex flex-col justify-center items-center gap-5"
    >
      <h1 className="text-4xl font-medium underline">Create a user</h1>
      <motion.div className="bg-[#0f1417] rounded w-100 p-10 flex flex-col gap-5">
        <motion.input
          layout
          type="text"
          placeholder="Enter name"
          name="name"
          value={userData.name}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 focus:border-[#9dc9ce] border-zinc-600 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input
          layout
          type="text"
          placeholder="Enter Email"
          name="email"
          value={userData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          className="border-2 focus:border-[#9dc9ce] border-zinc-600 rounded px-7 py-2 outline-0"
        ></motion.input>
        <motion.input
          layout
          type="text"
          placeholder="Image url"
          name="url"
          value={userData.url}
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
                className="mr-5 h-5 w-5 border-2 border-transparent border-t-white border-r-white rounded-full"
              ></motion.div>
            )}
            {status && (
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeIn",
                }}
                className={`text-center ${
                  created ? "text-[#57bac5]" : "text-red-600"
                }  font-medium tracking-wide`}
              >
                {status}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={submit}
          className="hover:shadow-2xl text-black hover:-translate-y-1 transition-all ease hover:shadow-[#37bac9] text-sm bg-[#36bbca] px-7 py-3 rounded font-medium cursor-pointer"
        >
          CREATE
        </button>
      </motion.div>
      <Link to="/users" className="text-[#2f777f] flex items-center gap-2">
        <FaEye />
        View Users
      </Link>
    </motion.div>
  );
};

export default CreateUser;
