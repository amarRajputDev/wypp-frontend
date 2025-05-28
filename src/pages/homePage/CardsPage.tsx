// import React from 'react'
import img1 from "../../assets/vecteezy_helping-hand-and-friendship-concept-small-boy-cartoon_13903890.jpg"
import img3 from "../../assets/friends.jpg"
import img2 from "../../assets/couple.jpg"

function CardsPage() {
    const data = [
        {
            image : img1,
            title : "✔️Make Friends",
            desc : "Find people with similar interests.",
            color : "#FF9F68"
        },
        {
            image : img2,
            title : "💖 Find Your College Crush!",
            desc : "Swipe, chat, and make connections that matter.",
            color : "#FF6B81"
        },
        {
            image : img3,
            title : "🚀 Connect. Collaborate. Succeed.",
            desc : "Meet ambitious students, find study partners, and grow together",
            color : "#A29BFE"
        },
    ]
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-[#F6ECB0]">
        <div className="w-full mt-[10vh]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center md:text-left font-bold">
                What We Offer
            </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-items-center mt-8 md:mt-10">
            {
                data.map((item, index) => (
                    <div 
                        key={index}
                        className={`w-full max-w-[320px] h-auto aspect-[3/4] border p-3 rounded-3xl transform transition-transform hover:scale-105`} 
                        style={{backgroundColor: item.color}}
                    >
                        <div className="w-full rounded-3xl overflow-hidden border h-[55%]">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="font-semibold text-xl sm:text-2xl text-[#3D3D3D] mt-4">
                            {item.title}
                        </h1>
                        <p className="mt-3 text-sm sm:text-base">
                            {item.desc}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CardsPage
