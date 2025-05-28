import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Search, Archive, Settings, CircleAlert } from "lucide-react";
import ChatListItem from "./ChatListItem";
import axios from "axios";

interface Chat {
  _id: string;
  fullName: string;
  lastMessage?: {
    _id: string;
    message: string;
    senderId: string;
    createdAt: string;
  };
  profilePic: string;
  online: boolean;
  unread: number;
  username: string;
  conversationId: string;
}

const pinnedChats: Chat[] = [
  {
    _id: "1",
    fullName: "Kailey",
    username: "kailey",
    profilePic: "/placeholder.svg?height=40&width=40",
    lastMessage: {
      _id: "1",
      message: "Say My Name",
      senderId: "1",
      createdAt: "9:36",
    },
    online: true,
    unread: 0,
    conversationId: "312",
  },
];

interface ChatSidebarProps {
  onChatSelect: (chatId: string) => void;
  selectedChatId: string | null;
}

export default function ChatSidebar({ onChatSelect, selectedChatId }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/message/contacts`, { withCredentials: true });
        const receivers = response.data.receivers.map((chat: any) => ({
          ...chat,
          online: false,
          unread: 0,
        }));
        setAllChats(receivers);
        console.log("Reciver ",receivers)
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => console.log("WebSocket Connected"));
    newSocket.on("user-online", (userId) => {
      setAllChats((prev) =>
        prev.map((chat) => (chat._id === userId ? { ...chat, online: true } : chat))
      );
    });
    newSocket.on("user-offline", (userId) => {
      setAllChats((prev) =>
        prev.map((chat) => (chat._id === userId ? { ...chat, online: false } : chat))
      );
    });
    newSocket.on("new-message", (message) => {
      setAllChats((prev) =>
        prev.map((chat) =>
          chat._id === message.senderId
            ? { ...chat, unread: chat.unread + 1, lastMessage: message }
            : chat
        )
      );
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const filteredAllChats = allChats.filter((chat: Chat) =>
    (chat?.fullName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) ||
    (chat?.lastMessage?.message?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false)
  );
  

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-base-300">
        <h1 className="text-xl font-bold">Chats</h1>
        <button className="btn btn-ghost btn-circle">
          <Settings size={20} />
        </button>
      </div>
      <div className="p-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-base-content opacity-60" />
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full pl-10 h-10 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="p-2 flex items-center gap-2 text-sm font-medium text-base-content/70">
        <Archive size={16} />
        <span>Archive</span>
      </div>
      <div className="overflow-y-auto flex-1">
        {filteredAllChats.length > 0 ? (
          filteredAllChats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              isSelected={chat.conversationId === selectedChatId}
              onClick={() => onChatSelect(chat.conversationId)}
            />
          ))
        ) : (
          <div className="w-full flex justify-center flex-col items-center mt-5">
            <CircleAlert />
            <h1 className="text-center">No chats</h1>
          </div>
        )}
      </div>
    </div>
  );
}
