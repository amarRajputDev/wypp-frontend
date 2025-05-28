import { motion } from "motion/react"
// import { div } from "motion/react-client"


function Marqee() {
  
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.1" className=" bg-radial from-[#C7F2A4] from-20% to-[#738C5F] z-10 w-screen py-16 overflow-hidden rounded-2xl">
        <motion.div animate={{x:"-50%"}} transition={{ease:"linear", repeat:Infinity, duration:25}} className=" text-[#556B2F] font-bold border-y-2 w-fit border-white leading-none flex whitespace-nowrap grotesk">
        <h1 className=" text-[25vw] uppercase ">
             WYPP🤙
        </h1>
        <h1 className=" text-[25vw] uppercase pl-9">
           WYPP🤙
        </h1>
        <h1 className=" text-[25vw] uppercase pl-9">
           WYPP🤙
        </h1>
        <h1 className=" text-[25vw] uppercase pl-9">
           WYPP🤙
        </h1>
            
        </motion.div>
      
    </div>

  )
}

export default Marqee
