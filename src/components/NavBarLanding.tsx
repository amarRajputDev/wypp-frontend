// import React from 'react'
import { motion } from "motion/react";
import logo from "../assets/boy-8515623_1920.png";
// import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAnimationStore from "../store/aniStore";

function NavBarLanding() {
  const location = useLocation();
  const { value, setValue,  } = useAnimationStore();
  const [isOpen, setisOpen] = useState(false)
  
  // const [xVal, setxVal] = useState<null | number>(value)

  const navigate = useNavigate()
  
 useEffect(() => {
  switch (location.pathname) {
    case "/":
      setValue(3)
      break;
    case "/about":
      setValue(95)
      break;
    case "/contact":
      setValue(195)
      break;
    
    default:
      setValue(0)
  }

  
 }, [location])
 

  return (

    <>
    
    <div className=" h-[70px]  fixed  w-screen z-50 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20   ">
      <div className=" flex w-full h-full lg:px-[100px] px-7 justify-between items-center">
        {/* logo */}
        <div className="flex items-center">
          <img src={logo} alt="" className="h-[30px] md:h-[50px] scale-x-[-1]" />
          <h1 className=" md:text-3xl text-xl rubik ml-1  bg-gradient-to-tl from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text ">
            Wypp
          </h1>
        </div>

        {/* links  */}
        <div className=" md:block relative hidden    ">


          {/* Animation span  */}
          <motion.span
          initial={{x:value}}
            animate={{ x:value }}
            className={`absolute h-[2px] bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 w-[25%] ${value==0?"hidden" : ""} bottom-0 left`}></motion.span>
          
          <ul className="flex gap-9 px-3  ">
            <motion.li className=" relative cursor-pointer h-[30px] overflow-hidden text-xl roboto-regular">
            <Link to={"/"}>
              <motion.div
                whileHover={{ y: -30 }}
                className={`${
                  location.pathname == "/" ? "text-pink-700" : ""
                }`}
              >
                Home <br /> Home{" "}
          {/* <span className={` absolute bottom-0 ${location.pathname == "/" ? "" : "hidden"} left-0  h-[2px] bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 w-full`}></span> */}
              </motion.div>
                  </Link>
            </motion.li>


            <motion.li className="  cursor-pointer relative h-[30px] overflow-hidden text-xl roboto-regular">
              <Link to={"/about"}>

              <motion.div whileHover={{ y: -30 }}
               className={`${
                location.pathname == "/about" ? "text-pink-700" : ""
              }`}
              >
                About <br /> About{" "}
               
              </motion.div>
              
              </Link>
              
            </motion.li>


            <motion.li className="  cursor-pointer h-[30px] relative overflow-hidden text-xl roboto-regular">
              <Link to={"/contact"}>
              <motion.div whileHover={{ y: -30 }}
               className={`${
                location.pathname == "/contact" ? "text-pink-700" : ""
              }`}
              >
                Contact <br /> Contact{" "}
          

              </motion.div>
              </Link>
            </motion.li>
          </ul>
        </div>

        {/* Login/Sighnup  */}
        <div className="md:flex hidden gap-5">
          <button 
           onClick={()=>navigate("/signup")}
          className={`btn btn-outline btn-primary ${location.pathname == "/signup" ? "hidden" : ""}`}>Signup</button>
          <button 
           onClick={()=>navigate("/login")}
          className={`btn  btn-secondary ${location.pathname == "/login" ? "hidden" : ""}`}>Login</button>
        </div>

        {/* For Mobile  */}
        <label  className="btn btn-circle swap swap-rotate md:hidden border-0 bg-accent-content/25">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={()=>{setisOpen(!isOpen);  console.log(isOpen)}} />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>


        {/* Drawer  */}
        <motion.div  
         initial={false} // Allow dynamic updates
         animate={{ x: isOpen ? "5%" : "100%" }} // Slide in & out
         transition={{ type: "spring", stiffness: 200, damping: 20 }}
         className=" bg-accent p-7 h-screen w-[60%] absolute top-0 right-0 -z-[1] md:hidden flex flex-col justify-between ">
            <div className=" mt-[50px]">
                <ul className=" text-3xl roboto-regular text-accent-content flex flex-col gap-3 ">
                    <li className={`${location.pathname == "/" ? "bg-[#e1af71] ": ""}  rounded-full px-3 p-1`}><Link to="/"> Home </Link></li>
                    <li className={`${location.pathname == "/about" ? "bg-[#e1af71]  ": ""} rounded-full px-3 p-1`}><Link to="/about"> About </Link></li>
                    <li className={`${location.pathname == "/contact" ? " bg-[#e1af71] ": ""} rounded-full px-3 p-1`}><Link to="/contact"> contact </Link></li>
                </ul>
            </div>

            <div  >
                <button 
                onClick={()=>navigate("/signup")}
                className= {`btn btn-primary ${location.pathname=="/signup" ? "hidden" : ""}`} >
               
                  Signup
           
                </button>
                <br />
                <button 
                onClick={()=>navigate("/login")}
                className={`btn mt-3 btn-neutral  btn-outline ${location.pathname=="/signup" ? "hidden" : ""}`}>
                  Login
                </button>
            </div>
        </motion.div>







        

      </div>

      
    </div>

   
    </>
  );
}

export default NavBarLanding;
