import { create } from 'zustand'

type Message = {
    createdAt: string;
    message: string;
    senderId: string;
    _id: string;
}

type MessagesStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: (message: Message) => 
    set((state) => {
      const updatedMessages = [...state.messages, message];
      // console.log("Updated messages:", updatedMessages); 
      return { messages: updatedMessages };
    }),
  clearMessages: () => set({ messages: [] }),
}));
