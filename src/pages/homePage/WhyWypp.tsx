// import React from 'react'

// import { motion } from "motion/react"

function WhyWypp() {
    const data = [
        {
            title:"🔥 A Platform Built for College Life",
            desc:"From campus meetups to late-night chats, WYP is designed for students who want to make the most of their college experience."
        },
        {
            title:"🌟 Your Space, Your Rules!",
            desc:"Wypp lets you create and join communities based on your passions—whether it’s business, coding, gaming, fitness, or just casual hangouts."
        },
        {
            title:"💡 Connect with Like-Minded Students",
            desc:"Tired of scrolling without purpose? Build a space where people share your interests, exchange ideas, and grow together."
        },
        {
            title:"👥 Private or Public—You Decide!",
            desc:"Keep it exclusive for your group or open to everyone—you have full control over your community."
        },
        {
            title:"🌟 Meet Like-Minded People",
            desc:"Whether you’re looking for new friends, a study buddy, a date, or just someone to vibe with, WYP makes it easy to find people who match your energy."
        },
        {
            title:"❤️ Friendship, Dating, or Just Good Vibes",
            desc:"Not every connection has to be about romance. WYP lets you choose your way—meet people for friendship, casual chats, or something more."
        },
    ]
    
  return (
    <div className=" w-screen bg-amber-300 p-10 min-h-screen flex flex-col gap-5 ">
        <div className="  text-[#2F3640]">
            <h1 className=" text-6xl font-semibold">Why Wypp</h1>
            <p className=" mt-2">Because College Life is More Fun When You’re Connected!</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
        {
            data.map((item , index)=>(
                <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">{item.title}</div>
                <div className="collapse-content">
                  <p>{item.desc}</p>
                </div>
              </div>
            ))
        }
        </div>

      
    </div>
  )
}

export default WhyWypp
