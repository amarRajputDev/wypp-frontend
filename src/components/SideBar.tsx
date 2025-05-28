// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import homeIcon from "../assets/Home.png";
import chatIcon from "../assets/Earth Globe.png";
import setting from "../assets/Settings.png";
import thoughtIcon from "../assets/Thinking Male.png";
import sthoughtIcon from "../assets/Spy.png";
import { Link, useLocation } from "react-router-dom";
// import MobileNav from "./MobileNav";


const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      {/* laptop */}

      <div className=" h-[90vh]  w-[30%] hidden relative bg-[#F7F5EB]  p-5 lg:flex flex-col gap-16  ">
      

        {/* MENU  */}
        <div className=" ">
          <ul className=" flex flex-col gap-4  ">
            <li className= {`rounded-full px-3 py-1 hover:bg-[#EDE9D5] hover:border-[#D4CBB8] duration-300 ${location.pathname == "/home" ? "bg-[#EDE9D5] border-[#D4CBB8]" : "" }`}>
              <Link to={"/home"} className="flex items-center gap-3 font-semibold roboto-regular">
                <img src={homeIcon} alt="" className=" h-10 " />
                Home
              </Link>
            </li>
            <li className= {`rounded-full px-2 w-full  py-1 hover:bg-[#EDE9D5] hover:border-[#D4CBB8] duration-300 ${location.pathname == "/home/announcement" ? "bg-[#EDE9D5] border-[#D4CBB8]" : "" }`}>
              <Link to={"/home/announcement"} className="flex items-center gap-3 font-semibold roboto-regular">
                <img src={thoughtIcon} alt="" className=" h-10 " />
                Announcement
              </Link>
            </li>
            {/* <li className= {`rounded-full px-3 py-1 hover:bg-[#EDE9D5] hover:border-[#D4CBB8] duration-300 ${location.pathname == "/home/wypespace" ? "bg-[#EDE9D5] border-[#D4CBB8]" : "" }`}>
              <Link to={"/home/wypespace"} className="flex items-center gap-3 font-semibold roboto-regular">
                <img src={chatIcon} alt="" className=" h-10 " />
                Wypp Space
              </Link>
            </li>
            <li className= {`rounded-full px-3 py-1 hover:bg-[#EDE9D5] hover:border-[#D4CBB8] duration-300  ${location.pathname == "/home/secretthoughts" ? "bg-[#EDE9D5] border-[#D4CBB8]" : "" }`}>
              <Link to={"/home/secretthoughts"} className="flex items-center gap-3 font-semibold roboto-regular">
                <img src={sthoughtIcon} alt="" className=" h-10 " />
                Secret Thoughts
              </Link>
            </li> */}
          </ul>
        </div>

        {/* SETTING  */}
        <div className=" absolute bottom-5 ">
          <Link to={"/home"}> 
          <img src={setting} alt="" className=" h-10" />
           </Link>
        </div>
      </div>

    

    </>
  );
};

export default Sidebar;
