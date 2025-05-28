import { useEffect } from "react";
import useSocketStore from "../store/socketStore";
import { useMessagesStore } from "../store/messagesStore";

const useGetRealTimeMsg = () => {
  const { Socket } = useSocketStore();
  const { addMessage , messages } = useMessagesStore(); // ✅ No need to get `messages` here

  useEffect(() => {
    if (!Socket) return;

    const handleNewMessage = (newMessage : any) => {
      console.log("Received new message:", newMessage);
      addMessage(newMessage); // ✅ Correct way to update Zustand
    };

    Socket.on("newMessage", handleNewMessage);

    return () => {
      Socket.off("newMessage", handleNewMessage); // ✅ Cleanup to avoid multiple listeners
    };
  }, [Socket , addMessage ,messages ]); // ✅ Depend on `Socket`

};

export default useGetRealTimeMsg;
