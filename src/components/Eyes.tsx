import { useEffect, useState } from "react"


function Eye() {
    const [Angle, setAngle] = useState(0)

    useEffect(() => {
        window.addEventListener("mousemove", (dets)=>{
            const x = dets.clientX
            const y = dets.clientY
            const xdiff = x - window.innerWidth/2
            const ydiff = y - window.innerHeight/2
            const Angle = Math.atan2(ydiff, xdiff) * (180/Math.PI)
            setAngle(Angle - 180)
           
        })
      
    }, [])
  return (
    <div>
      <div className=" absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] w-[300px] md:w-[450px] h-[30vh]  flex gap-9">
                <div className=" h-full flex-1 flex justify-center items-center rounded-full bg-white">
                    <div className=" size-[70%] relative rounded-full bg-black">
                        <div style={{transform: ` rotate(${Angle}deg)`}} className="w-full absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] h-[20%] ">
                        <div className=" h-full w-[20%] rounded-full bg-white"></div>
                        </div>
                    </div>

                </div>


                <div className=" h-full flex justify-center items-center flex-1 rounded-full bg-white">
                    <div className=" size-[70%] relative rounded-full bg-black">
                        <div style={{transform: ` rotate(${Angle}deg)`}} className=" w-full absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] h-[20%]  ">
                         <div className="h-full w-[20%]  size-full rounded-full bg-white"></div>
                        </div>
                    </div>

                </div>
            </div>
    </div>
  )
}

export default Eye