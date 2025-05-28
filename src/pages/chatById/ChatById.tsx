// import { notFound } from "next/navigation"
// import ChatInterface from "@/components/chat-interface"
// import { getUserById } from "@/lib/user-service"

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatInterface from "./InterFace";
import axios from 'axios';
import useUserStore from '../../store/authStore';

// This is a server component that fetches the receiver data
export default function ChatPage(): React.ReactElement {
  const  {receiverId } = useParams();
  const {userData} =useUserStore()
  const [ConversationId, setConversationId] = useState("")

  useEffect(() => {
    // console.log( "console loging before create conversation" , userData._id)
    const checkOrCreateConversation = async () => {
      if (!userData?._id || !receiverId) return; // Ensure values exist
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/message/getOrCreateConversation/`,{
            senderId:userData._id,
            receiverId
          },
          { withCredentials: true }
        );
  
        console.log("conversationId:", response.data);
        setConversationId(response.data.conversationId)
      } catch (error:any) {
        console.error("Error fetching conversation:", error.response?.data || error.message);
      }
    };
  
    checkOrCreateConversation();
  }, [receiverId, userData?._id]);
  

  // In a real app, you would fetch the receiver's data from your database
//   const receiver = await getUserById(receiverId)

  // If the user doesn't exist, show a 404 page
//   if (!receiver) {
//     notFound()
//   }

  return (
    <div className="flex flex-col h-screen">
      <ChatInterface key={receiverId} conversationId={ConversationId} />
    </div>
  )
}

