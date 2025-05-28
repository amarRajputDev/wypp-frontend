import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Paperclip, Smile } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import useUserStore from "../../store/authStore";
import { useMessagesStore } from "../../store/messagesStore";
import useGetRealTimeMsg from "../../hooks/useGetRealTimeMsg";
import EmojiPicker from "emoji-picker-react";

interface ChatConversationProps {
  chatId: string;
  onBack: () => void;
  showBackButton: boolean;
}

interface Message {
  createdAt: string;
  message: string;
  senderId: string;
  _id: string;
}

interface User {
  _id: string;
  username: string;
  profilePic: string;
}

export default function ChatConversation({ chatId, onBack, showBackButton }: ChatConversationProps) {
  useGetRealTimeMsg();

  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState<User | null>(null);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  
  const { userData, onlineUsers } = useUserStore();
  const { messages, addMessage , clearMessages } = useMessagesStore();
  const [isLoading, setisLoading] = useState(true)
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fetchedRef = useRef(false);

  const handleEmojiClick = (emojiData :any) => {
    setInput((prev) => prev + emojiData.emoji);
  };
  // Scroll to the latest message
  useEffect(() => {
    // console.log( "by container" ,chatId)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, newMessage ,isLoading]);

  // Fetch chat data (messages, sender, receiver)
  useEffect(() => {
    if (!chatId || fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchChatData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/message/conversation/${chatId}`, {
          withCredentials: true,
        });

        const { sender, receiver, messages: fetchedMessages } = response.data;
        clearMessages()
        setSender(sender);
        setReceiver(receiver);
        console.log("chat users" , response.data)

        setTimeout(() => {
          
          setisLoading(false)
        }, 1000);

        

        fetchedMessages.forEach((msg: Message) => {
          if (!messages.some((m) => m._id === msg._id)) addMessage(msg);
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();

  }, [chatId, addMessage, messages]);




  // Check if the receiver is online
  const isOnline = receiver ? onlineUsers?.includes(receiver._id) : false;

  // Format timestamp
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

  // Handle sending a message
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

      setNewMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Message send error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="border-b border-base-300 p-3 flex items-center">
        {showBackButton && (
          <button onClick={onBack} className="mr-2 btn btn-ghost btn-sm btn-circle">
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex items-center">
          <div className="relative mr-3">
            <img
              src={receiver?.profilePic || "/placeholder.svg"}
              alt={receiver?.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>}
          </div>
          <div>
            <h3 className="font-medium">{receiver?.username}</h3>
            <p className="text-xs text-base-content/70">{isOnline ? "Online" : "Offline"}</p>
          </div>
        </div>
      </div>

    

      {/* Messages Section */}
      {showPicker && (
        <div style={{ position: "absolute", top: "100%", zIndex: 100 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">



        {
          isLoading ? 
          
          [...Array(10)].map((_, index) => (
            <>
            <div className={`chat ${index%2==0?"chat-start" : "chat-end"}`}>
  <div className="chat-bubble skeleton">
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
  </div>
</div>

            </>
          ))
          :
          messages.map((message) => (
            <div key={message._id} className={`flex ${message.senderId === userData?._id ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === userData?._id ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"
                }`}
              >
                <p>{message.message}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.senderId === userData?._id ? "text-primary-content/70" : "text-base-content/70"
                  }`}
                >
                  {formatDate(message.createdAt)}
                </div>
              </div>
            </div>
          ))
        }
        <div ref={messagesEndRef} />
      </div>
    

      {/* Message Input Section */}
      <form onSubmit={handleSendMessage} className="border-t border-base-300 p-3 flex items-center gap-2">
        <button type="button" className="btn btn-ghost btn-circle">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button type="button" className="btn btn-ghost btn-circle" onClick={() => setShowPicker(!showPicker)}>
          <Smile size={20} />
        </button>
        
        <button type="submit" className="btn btn-primary btn-circle" disabled={!newMessage.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
