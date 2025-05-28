// import React from 'react'
import homeIcon from "../assets/Home.png";
import chatIcon from "../assets/Earth Globe.png";
// import setting from "../assets/Settings.png";
import thoughtIcon from "../assets/Thinking Male.png";
import sthoughtIcon from "../assets/Spy.png";
import { Link, useLocation } from 'react-router-dom'

function MobileNav() {
    const location =useLocation()
  return (
    <div>
      
      <div className="dock p-4 lg:hidden  fixed bottom-3 shadow-2xl rounded-3xl w-[90%] ml-[5%] ">
        <Link to={"/home"} className={`${location.pathname=== "/home" ? " bg-primary" : ""} duration-300`}>
          <img src={homeIcon} alt="" className={`h-full`} />
          <span className="dock-label">Home</span>
        </Link>

        <Link to={"/friends"} className={`${location.pathname === "/friends" ? " bg-primary" : ""} duration-300`}>
          <img src={chatIcon} alt="" className=" h-full" />
          <span className="dock-label">Friends</span>
        </Link>

        <Link to={"/home/chat"} className={`${location.pathname === "/home/chat" ? " bg-primary" : ""} duration-300`}>
          <img src={thoughtIcon} alt="" className=" h-full" />
          <span className="dock-label">Chat</span>
        </Link>

        <Link to={"/home/announcement"} className={`${location.pathname==="/home/secretthoughts" ? " bg-primary" : ""} duration-300`}>
          <img src={sthoughtIcon} alt="" className=" h-full" />
          <span className="dock-label">Announcement</span>
        </Link>
      
      </div>
    </div>
  )
}

export default MobileNav
