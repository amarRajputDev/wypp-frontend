

import { useState, useRef, useEffect } from "react"
// import { useMobile } from "../../hooks/use-mobile"
import { useMessagesStore } from "../../store/messagesStore"
import axios from "axios"
import useUserStore from "../../store/authStore"
import { toast } from "react-toastify"
import useGetRealTimeMsg from "../../hooks/useGetRealTimeMsg"
import { Paperclip, Send, Smile } from "lucide-react"
// import { user } from "../../../types"

type User = {
  _id: string
  username: string
  profilePic: string
//   status?: "online" | "offline" | "away"
}

// type Message = {
//     createdAt: Date;
//     message: string;
//     senderId: string;
//     _id: string;
// }

// interface ChatInterfaceProps {
//   receiver: User
// }

export default function ChatInterface({ conversationId }: {conversationId:string}) {
    useGetRealTimeMsg()
//   const [messages, setMessages] = useState<Message[]>([])
//   const [inputValue, setInputValue] = useState("")
  const [newMessage, setnewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // const isMobile = useMobile()
//   const {addMessage} =useMessagesStore()
  const {userData ,onlineUsers} =useUserStore()
  const [receiver, setReceiver] = useState<User | null>(null)
  const [sender, setSender] = useState<User | null>(null)
  const {addMessage ,messages } =useMessagesStore()

  const isOnline = onlineUsers?.includes(receiver?._id!);

  

  // Mock current user - in a real app, this would come from authentication
//   const {userData} =useUserStore()
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load initial messages - in a real app, fetch from API
  useEffect(() => {
    if (!conversationId) return; // ⛔ Prevent call if conversationId is not yet available
  
    const fetchChatData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/message/conversation/${conversationId}`,
          { withCredentials: true }
        );
  
        const { sender, receiver, messages: fetchedMessages } = response.data;
  
        setSender(sender);
        setReceiver(receiver);
  
        // ✅ Add only new messages
        fetchedMessages.forEach((msg: any) => {
          if (!messages.some((m) => m._id === msg._id)) {
            addMessage(msg);
          }
        });
  
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
  
    fetchChatData();
  }, [conversationId]);
  

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !receiver) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/message/sendMessage/${receiver._id}`,
        { message: newMessage },
        { withCredentials: true }
      );

      toast.info(response.data.message);

      addMessage({
        message: newMessage,
        senderId: sender?._id || "",
        createdAt: new Date().toISOString(),
        _id: response.data._id || Math.random().toString(),
      });

      setnewMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Message send error:", error);
    }
  };

  const formatTime = (datee :string) => {
    const date = new Date(datee); 
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // const getStatusColor = (status?: string) => {
  //   switch (status) {
  //     case "online":
  //       return "bg-success"
  //     case "away":
  //       return "bg-warning"
  //     default:
  //       return "bg-gray-400"
  //   }
  // }

  return (
    <>

      <div className="navbar bg-base-100  shadow-sm">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={receiver?.profilePic || "/placeholder.svg?height=40&width=40"} alt={receiver?.username} />
              </div>
              {/* {receiver.status === "online" && (
                <div className="absolute bottom-0 right-0 badge badge-xs badge-success"></div>
              )} */}
            </div>
            <div>
              <h2 className="font-semibold">{receiver?.username}</h2>


              
              <p className="text-xs opacity-70">{isOnline  ? "Online" : "Offline"}</p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
        {messages.map((message) => {
        //   const isCurrentUser = message.senderId === userData?._id

          return (
            <div key={message._id} className={`flex  ${message.senderId === userData?._id ? "justify-end " : "justify-start "}`}>
              <img src={receiver?.profilePic}className={`size-12 ${message.senderId === userData?._id ? "hidden" : ""} rounded-full  `} alt="" />
              <div
                className={`max-w-[80%] shadow-xl rounded-lg p-3 ${
                  message.senderId === userData?._id ? "bg-primary text-primary-content" : " bg-accent text-accent-content"
                }`}
              >
                <p>{message.message}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.senderId === userData?._id ? "text-primary-content/70" : "text-base-content/70"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </div>
              </div>
              <img src={sender?.profilePic} className={`size-12 ${message.senderId === userData?._id ? "" : "hidden"} rounded-full `} alt="" />

            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

   
      <form onSubmit={handleSendMessage} className="border-t border-base-300 p-3 flex items-center gap-2">
        <button type="button" className="btn btn-ghost btn-circle">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button type="button" className="btn btn-ghost btn-circle">
          <Smile size={20} />
        </button>
        <button type="submit" className="btn btn-primary btn-circle" disabled={!newMessage.trim()}>
          <Send size={20} />
        </button>
      </form>
    </>
   
  )
}

