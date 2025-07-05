import { Link } from "react-router-dom";
import logo from "../assets/logo (1).png";
import home from "../assets/Home.png";
import chat from "../assets/New Topic.png";
import friends from "../assets/Team.png";
import profile from "../assets/user.png";
import setting from "../assets/Settings.png";
// import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
// import SearchUser from "./SearchUser";
// import { Search } from "lucide-react";

function NavbarHome() {
    const [index, setIndex] = useState(0)
    const [isOpen, setisOpen] = useState(false)



    
  return (
    <>
    <div className=" bg-[#F7F5EB] z-10 p-2 md:px-10 w-screen lg:flex items-center hidden  justify-between ">

 

        {/* HEAD  */}
        <div className=" flex justify-between items-center">

        <div className=" flex items-center justify-between gap-3">
          <div>
            <img src={logo} alt="" className=" w-28" />
          </div>
          
        </div>
          {/* <SearchUser/> */}

        </div>
        

        {/* menu  */}
        <div className=" flex relative gap-12  px-10 p-1">

            {/* Animate Span  */}
            <motion.span 
            initial={{}}
            animate={{x:87*index}}
            className=" absolute w-12 h-1 rounded-full bg-[#D77A61]   shadow-[0_0_30px_10px_rgba(255,150,120,0.8)]   animate-pulse bottom-0 left-9 "></motion.span>

            <Link to={"/home"} onClick={() => setIndex(0)}>
            <img src={home} alt="" className=" h-10"/>
            </Link>
            <Link to={"/home/chat"} onClick={() => setIndex(1)}>
            <img src={chat} alt="" className=" h-10"/>
            </Link>
            <Link to={"/Friends"} onClick={() => setIndex(2)}>
            <img src={friends} alt="" className=" h-10"/>
            </Link>
        </div>

        <Link to={"/home/profile"}>
            <img src={profile} alt="" className=" h-10" />
        </Link>
    </div>

    

    <div className="navbar bg-base-100 shadow-sm lg:hidden flex items-center justify-between">
  <div className="flex-none  rounded-2xl ">
    <button 
    onClick={() => setisOpen((prev) => !prev)}
    className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button>
  </div>
  <div className=''>
    <img src={logo} alt="" className=" h-10" />
  </div>
  <div className="  flex-1 px-10">

  {/* <SearchUser/> */}
  </div>
  <Link to={"/home/profile"} className="flex-none">
    <img src={profile} alt="" className=" h-10 " />
  </Link>
</div>


{/* DRAWER  */}
 <motion.div 
 initial={{x:0}}
 animate={{x:isOpen ? "100vw" : 0}}
 transition={{duration:.3 , ease :[0.5, 1, 0.89, 1] }}
 className=" lg:hidden h-screen w-[100vw] -left-[100vw] fixed bg-neutral z-10  " >
    <div className=" size-full relative">

    <ul className=" text-center mt-12 flex flex-col gap-5 abel-regular">
        <motion.li
        initial={{x:-300,opacity:0}}
        animate={{x: isOpen ? 0 : -300 , opacity:isOpen ? 1 : 0}}
        transition={{duration:.5 , delay:.2}}
        className="">
           
            <Link to={"/home"} className= {` text-4xl  ${location.pathname === "/home" ? "border-b-2 text-primary-content" : "text-neutral-content"}`} >Home</Link>
        </motion.li>
        <motion.li
        initial={{x:-300,opacity:0}}
        animate={{x: isOpen ? 0 : -300 , opacity:isOpen ? 1 : 0}}
        transition={{duration:.5 , delay:.3}}
        >
            <Link to={"/home/wypespace"} className={` text-4xl  ${location.pathname === "/home/wypespace" ? "border-b-2 text-primary-content" : "text-neutral-content"}`}>Friends</Link>
        </motion.li>
        <motion.li
        initial={{x:-300,opacity:0}}
        animate={{x: isOpen ? 0 : -300 , opacity:isOpen ? 1 : 0}}
        transition={{duration:.5 , delay:.4}}
        >
            <Link to={"/home/announcement"} className={` text-4xl  ${location.pathname === "/home/announcement" ? "border-b-2 text-primary-content" : "text-neutral-content"}`}>Announcement</Link>


        </motion.li>


       
    </ul>

    <Link to={""} className=" absolute bottom-36 right-5 ">
    <img src={setting} alt="" className="h-10"/>
    </Link>
    </div>


 </motion.div>
    </>
  )
}

export default NavbarHome
