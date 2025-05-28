import { memo, useMemo } from "react";
import useUserStore from "../../store/authStore";

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
}

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatListItem = ({ chat, isSelected, onClick }: ChatListItemProps) => {
  const { onlineUsers } = useUserStore();
  const isOnline = onlineUsers?.includes(chat._id);

  // Memoized formatted time for better performance
  const formattedTime = useMemo(() => {
    return chat.lastMessage?.createdAt
      ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  }, [chat.lastMessage?.createdAt]);

  return (
    <div
      role="button"
      aria-selected={isSelected}
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer transition duration-200 rounded-md 
        ${isSelected ? "bg-base-300" : "hover:bg-base-200"}`}
    >
      {/* Profile Picture & Online Status */}
      <div className="relative w-10 h-10 mr-3">
        <img
          src={chat.profilePic || "/placeholder.svg"}
          alt={chat.fullName}
          className="w-full h-full rounded-full object-cover"
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium truncate">{chat?.username}</h3>
          <span className="text-xs text-base-content/60">{formattedTime}</span>
        </div>
        <p className="text-xs text-base-content/70 truncate">
          {chat.lastMessage?.message || "No messages yet"}
        </p>
      </div>

      {/* Unread Badge */}
      {chat.unread > 0 && (
        <div className="ml-2 badge badge-primary badge-sm">{chat.unread}</div>
      )}
    </div>
  );
};

export default memo(ChatListItem); // Prevents unnecessary re-renders
