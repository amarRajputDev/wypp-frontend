import { create } from "zustand";
import { user } from "../../types.ts";

interface UserState {
  userData: user | null;
  isLogin: boolean;
  onlineUsers: string[] | null;
  setUser: (userData: user) => void;
  logout: () => void;
  setOnlineUsers: (onlineUsers: string[]) => void;
}

// Load initial state from localStorage
// const storedUser = 
// const storedIsLogin = localStorage.getItem("isLogin");

const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  userData: null,
  onlineUsers: null,

  setUser: (data: user) => {
   
    set({ userData: data, isLogin: true });
  },

  logout: () => {

    set({ userData: null, isLogin: false });
  },

  setOnlineUsers: (onlineUsers: string[]) => {
    set({ onlineUsers });
  },
}));

export default useUserStore;
