import service from "../../assets/service.png"
import friends from "../../assets/friends.jpg" 
import vector from "../../assets/Vector 5.png" 
import couple from "../../assets/couple.jpg" 
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

function LendingPage() {

  const navigate = useNavigate()
  
  return (
    <div className="relative w-full lg:overflow-hidden min-h-screen flex flex-col lg:flex-row overflow-x-hidden">
      {/* Bottom right gradient */}
      <div className="fixed bottom-0 -z-[50] right-0 w-1/3 h-1/3 bg-gradient-to-br from-rose-300 to-transparent rounded-full blur-3xl"></div>
      <img src={vector} alt="" className=" fixed -z-[50]  bottom-0 right-0 h-[70vh] " />

      {/* Card  */}
      <motion.div 
      initial={{y:100 , opacity:0}}
      animate={{y:0 , opacity:100}}
      transition={{  delay:2}}
      className="w-[300px] bg-white-400 hidden md:flex flex-col gap-5  xl:mt-70 xl:ml-180 mt-50 ml-110 p-5 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 absolute">
        
        <p className=" text-[#070D15] text-[12px] roboto-regular">Wypp made it so easy to connect with like-minded students on campus! I’ve made great friends and even found study partners here.</p>
        <h1 className=" font-semibold text-[#264065]">~Rahul</h1>
      </motion.div>

      {/* card2 */}
      <motion.div 
      initial={{y:100 , opacity:0}}
      animate={{y:0 , opacity:100}}
      transition={{  delay:2.2}}
      className="w-[300px] -z-[2] hidden  bg-white-400 md:flex flex-col gap-5  xl:mt-118 xl:ml-150 mt-90 ml-90  p-5 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 absolute">
        
        <p className=" text-[#070D15] text-[12px] roboto-regular">I landed my first internship through a connection I made on Wypp! It’s not just social networking, it’s career networking too!</p>
        <h1 className=" font-semibold text-[#264065]">~Sarthak</h1>
      </motion.div>

      {/* left  */}
      <div className=" text-[#2C3E50] roboto-regular lg:px-[100px] px-[20px]  lg:h-screen h-fit pb-32  lg:w-[49%] ">
        <div className=" md:mt-36 mt-28  ">
        <h1 className=" xl:text-6xl text-6xl font-bold roboto-regular ">College Life is Better with Friends!</h1>
        <p className=" mt-5 text-xl ">Make new friends, find your tribe, <br /> and enjoy student life!</p>
        </div>

        <button className="btn  md:mt-20 mt-10 btn-secondary btn-wide" onClick={()=>{ navigate("/login") }}>Get Started</button>

        <div className=" xl:mt-30 mt-20 xl:w-[50%] lg:w-full w-[70%]">
          <img src={service} alt="" />
        </div>
      </div>

      {/* right  */}
      <div className=" lg:flex-[1] xl:h-[100vh]  hidden md:block    h-[80vh] mt-28 md:mt-0 items-center  ">

        <div className=" w-full flex flex-col md:flex-row h-[80%] gap-5 lg:mt-32 px-8">

          <div className=" flex-[1]  flex flex-col justify-between ">
            <motion.div
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Time for one full animation cycle
              repeat: Infinity, // Loops infinitely
              ease: "easeInOut",
              delay:0.2
            }}
            className=" w-full h-[60%] rounded-4xl relative -z-[50]   bg-white shadow-2xl overflow-hidden">
              <img src="https://img.freepik.com/premium-vector/friendship-day-young-people-from-different-countries-regions-have-become-friends-they-smile_1076168-76.jpg" alt="" className="h-full object-contain absolute bottom-0" />
            </motion.div>

            <motion.div 
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Time for one full animation cycle
              repeat: Infinity, // Loops infinitely
              ease: "easeInOut",
            }}
            className=" w-full h-[30%] rounded-4xl bg-white hidden md:block  -z-[50] shadow-2xl">
              <img src="https://png.pngtree.com/png-clipart/20231007/original/pngtree-group-of-friends-with-blue-shirt-illustration-vector-png-image_12976111.png" className="h-full object-center  mx-auto  bottom-0" alt="" />
            </motion.div>
          </div>

          <div className=" flex-[1]  flex flex-col justify-between ">
            <motion.div 
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Time for one full animation cycle
              repeat: Infinity, // Loops infinitely
              ease: "easeInOut",
              delay:0.3

            }}
            className=" w-full h-[30%] overflow-hidden  -z-[50] rounded-4xl shadow-2xl">

              <img src={friends} alt="" className=" w-full" />
            </motion.div>
            <motion.div 
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Time for one full animation cycle
              repeat: Infinity, // Loops infinitely
              ease: "easeInOut",
              delay:0.4

            }}
            className=" w-full h-[60%] flex justify-between overflow-hidden -z-[50] items-center rounded-4xl shadow-2xl bg-white">
              <img src="https://img.freepik.com/premium-vector/groups-happy-diverse-people-friends-coworkers-are-standing-posing-together-photo-looking-camera-community-cooperation-friendship-teamwork-concept-illustration_270158-711.jpg" alt="" />
            </motion.div>
          </div>

          <div className=" flex-[1]  flex items-center ">
            <motion.div
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Time for one full animation cycle
              repeat: Infinity, // Loops infinitely
              ease: "easeInOut",
            }}
            className=" h-[55%] shadow-2xl rounded-4xl hidden md:flex justify-center bg-white -z-[50] w-full overflow-hidden">
              <img src={couple} alt="" className=" w-full object-contain " />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendingPage;
